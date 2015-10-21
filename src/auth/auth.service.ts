import * as Auth0Lock from 'auth0-lock';

import * as model from './auth.model';

import { Profile } from './auth.interface';

const Lock = new Auth0Lock('A9xnMR5yCNlOs0HbLB17OeOUZpCYnG4G', 'tomastrajan.eu.auth0.com');

export function login() {
    let options = {authParams: { scope: 'openid profile' }};
    Lock.show(options, (err, profile, token) => {
        if (err) {
            return console.log(err);
        }
        localStorage.setItem('id_token', token);
        model.setProfile(profile as Profile);
    });
}

export function logout() {
    Lock.logout();
    localStorage.removeItem('id_token');
    model.setProfile(undefined);
}

export function init() {
    let token = localStorage.getItem('id_token');
    if (token) {
        Lock.getProfile(token, function (err, profile) {
            if (err) {
                return console.log(err);
            }
            model.setProfile(profile as Profile);
        });
    }
}