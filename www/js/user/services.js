angular.module('user.services', [])

    .service('UserService', ['$q', 'ParseConfiguration',
        function ($q, ParseConfiguration) {

            var parseInitialized = false;


            return serviceFunctions = {

                /**
                 *
                 * @returns {*}
                 */
                init: function () {

                    debugger;
                    // if initialized, then return the activeUser
                    if (parseInitialized === false) {
                        Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
                        parseInitialized = true;
                        //console.log("parse initialized in init function");
                    }

                    var currentUser = Parse.User.current();
                    if (currentUser) {
                        return $q.when(currentUser);
                    } else {
                        return $q.reject({error: "noUser"});
                    }

                },
                /**
                 *
                 * @param _userParams
                 */
                createUser: function (_userParams,fb) {
                    _userParams = typeof _userParams !== 'undefined' ? _userParams : {};
                    fb = typeof fb !== 'undefined' ? fb : false;
                    var user = new Parse.User();
                    user.set("username", _userParams.email);
                    user.set("password", _userParams.password);
                    user.set("email", _userParams.email);
                    user.set("first_name", _userParams.first_name);
                    user.set("last_name", _userParams.last_name);
                    if(fb){
                        /*user.set("accessToken",_userParams.accessToken);
                        user.set("facebookId",_userParams.facebookId);
                        user.set("completeName",_userParams.name);*/
                    }
                    // should return a promise
                    return user.signUp(null, {});

                },
                createFacebook:function(_user,_userParams){
                    var acceptable = ['first_name','last_name','name', 'facebookId','accessToken'];
                    var Facebook = Parse.Object.extend("FacebookUser");
                    var facebook = new Facebook();
                    var queryFacebook = new Parse.Query(Facebook);
                    queryFacebook.equalTo('parent',_user);
                    queryFacebook.find({
                        success: function(result){
                            if(result.length < 1){//no hay anteriores por lo tanto crearla
                                //console.log("saving update");
                                //console.log("aca4");
                                //console.log(_user);
                                for(var key in _userParams){
                                    if(acceptable.indexOf(key) > -1){
                                        if(_userParams.hasOwnProperty(key)){
                                            facebook.set(key,_userParams[key]);
                                            facebook.set('parent',_user);
                                        }
                                    }
                                }
                                facebook.save(null, {
                                    success: function(user) {
                                        console.log("successupdating");

                                    },
                                    error:function(object,error){
                                        console.log("errorssupdating");
                                        console.log(error);
                                    }
                                });
                            }else{//hay una instancia facebook, actualizarle el accessToken con el nuevo traído
                                var existentFacebook = result[0];
                                existentFacebook.set('accessToken',_userParams.accessToken);
                                existentFacebook.save(null, {
                                    success: function(user) {
                                        console.log("successupdatingexistingfacebook");

                                    },
                                    error:function(object,error){
                                        console.log("errorupdatingexistingfacebook");
                                        console.log(error);
                                    }
                                });
                            }
                        },
                        error: function(object,err){
                            console.log("error revisando si hay instancias facebook");
                            console.log(err);
                        }
                    });
                },
                /**
                 *
                 * @param _userParams
                 * @param _user
                 */
                updateUser: function (_user,_userParams,no_user) {
                    _userParams = typeof _userParams !== 'undefined' ? _userParams : {};
                    _user = typeof _user !== 'undefined' ? _user : {};
                    no_user = typeof no_user !== 'undefined' ? no_user : false;

                    var acceptable = ['first_name','last_name','name', 'facebookId','accessToken'];
                    var Facebook = Parse.Object.extend("FacebookUser");
                    var facebook = new Facebook();
                    if(no_user){
                        //console.log("aca1");
                        var queryUser = new Parse.Query(Parse.User);
                        queryUser.equalTo("email",_userParams.email);
                        //console.log("aca2");
                        queryUser.find({
                            success: function(results) {
                                console.log("aca3");
                                // The object was retrieved successfully.
                                console.log(results);
                                console.log(_userParams);

                                _user = results[0];
                                //create Facebook Instance
                                serviceFunctions.createFacebook(_user,_userParams);
                                
                            },
                            error: function(object, error) {
                                console.log("aca5");
                                //no deberia entrar ya que encuentra objeto porque parse dijo q era repetido, pero si entra es otro error de retrieve
                                console.log(error);
                                // The object was not retrieved successfully.
                                // error is a Parse.Error with an error code and message.
                            }
                        });
                    }else{
                        for(var key in _userParams){
                            if(acceptable.indexOf(key) > -1){
                                if(_userParams.hasOwnProperty(key)){
                                    facebook.set(key,_userParams[key]);
                                    facebook.set('parent',_user);
                                }
                            }
                        }
                        console.log("saving update");
                        facebook.save();
                    }


                // should return a promise

            },
            /**
             *
             * @param _data
             * @param _creds
             */
                saveSecurity: function (_data,_creds) {
                var Security = Parse.Object.extend("Security");
                var securityData  = new Security();
                securityData.set('key',_data.id);
                securityData.set('value',_creds.password);
                securityData.set('parent',_data);
                return securityData.save();
                // should return a promise

            },
            /**
             *
             * @param _email
             */
            findSecurityKey: function (_email) {
                var Security = Parse.Object.extend("Security");
                var queryUser = new Parse.Query(Parse.User);
                queryUser.equalTo("email",_email)
                return queryUser.find();
                // should return a promise

            },
            findSecurityValue: function(_key){
                // The object was retrieved successfully.
                //retrieve the security
                var Security = Parse.Object.extend("Security");
                var querySecurity = new Parse.Query(Security);
                querySecurity.equalTo('parent',_key);
                return querySecurity.find();
            },
            /**
             *
             * @param _parseInitUser
             * @returns {Promise}
             */
            currentUser: function (_parseInitUser) {

                // if there is no user passed in, see if there is already an
                // active user that can be utilized
                _parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();

                //console.log("_parseInitUser " + Parse.User.current());
                if (!_parseInitUser) {
                    return $q.reject({error: "noUser"});
                } else {
                    return $q.when(_parseInitUser);
                }
            },
            /**
             *
             * @param _user
             * @param _password
             * @returns {Promise}
             */
            login: function (_user, _password) {
                return Parse.User.logIn(_user, _password);
            },
            /**
             *
             * @param _user
             * @returns {Promise}
             */
            reset: function (_user){
                return Parse.User.requestPasswordReset(_user);
            },
            /**
             *
             * @returns {Promise}
             */
            logout: function (_callback) {
                var defered = $q.defer();
                Parse.User.logOut();
                defered.resolve();
                return defered.promise;

            }

        }
}]);
