'use strict';

describe('utilities', function() {
    var utils = require('../../../lib/utilities');
    var mockAuth = require('../../mocks/auth');
    var axios = require('axios');
    var Bluebird = require('bluebird');
    var authFlow = mockAuth.mockImplicitGrantFlow();

    describe('requestWithFileFun', function() {
        var ajaxSpy;

        beforeEach(function() {
            ajaxSpy = spyOn(axios, 'request').and.returnValue(Bluebird.resolve({
                headers: {}
            }));
        });

        it('should allow a custom content-type to be set against a request', function(done) {
            var file = {
                name: 'fileName',
                type: 'text/plain'
            };
            var requestFunction = utils.requestWithFileFun({
              authFlow: function () {
                return authFlow;
              },
              baseUrl: function () {
                return 'url';
              },
              method: 'POST',
              resource: 'resource',
              linkType: 'link',
              headers: {
                'Content-Type': 'text/html'
              }
            });

            requestFunction(file).finally(function() {
                expect(ajaxSpy.calls.mostRecent().args[0].headers['Content-Type']).toBe('text/html');
                done();
            });
        });
    });
});
