declare module 'passport-local-mongoose' {
    import passport = require('passport');
    import express = require('express');
    import mongoose = require('mongoose');

    class PLM extends mongoose.Schema {
        constructor(schema?: Object, options?: Object);

        pbkdf2(password:string, salt:string, callback?: Object);
        setPassword(password: string, cb?: Object): void;
        authenticate(password?: string, cb?: Object): void;
        serializeUser(): void;
        deserializeUser(): void;
        register(user: string, password: string, cb?: Object): void;
        findByUsername(username: string, selectHashSaltFields?: Object, cb?: Object): void;
        createStrategy(): void;
    }

}