import { Component } from '@angular/core';
import { PetstoreService } from './petstore.service';
import 'jsonforms';
import * as SwaggerParser from 'swagger-parser/dist/swagger-parser';
import * as async from 'async';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  private swagger = {};
  private schemas = [];
  private schema = {};
  private data = {};
  private pathReport = [];

  constructor(private petstoreService: PetstoreService) {
    let self = this;
    async.waterfall([
      getSwagger,
      derefSwagger,
    ], function (err, result) {
      console.log(result)
      var paths = [];
      Object.keys(result.paths).forEach(function (pathKey) {
        var pathObj = {
          path: pathKey,
          ops: []
        };
        var path = result.paths[pathKey]
        Object.keys(path).forEach(function (opKey) {
          var opObj = {
            operation: opKey,
            responses: []
          }
          var responses = path[opKey].responses
          //console.log('responses: ', JSON.stringify(responses, null, 2))
          Object.keys(responses).forEach(function (responseKey) {
            var respObj = {
              verb: responseKey,
              schema: {}
            }
            var response = responses[responseKey];
            if (response.schema) {
              respObj.schema = response.schema;
              opObj.responses.push(respObj);
              pathObj.ops.push(opObj);
              paths.push(pathObj);
            }
          });
        });
      });
      console.log(JSON.stringify(paths, null, 2))
      self.pathReport = paths;
      self.swagger = result;
      self.title = result.info.title + ' Schemas'
    });
    function getSwagger(callback) {
      petstoreService.getSwagger()
        .subscribe(
        data => callback(null, data),
        error => callback(error),
      );
    }
    function derefSwagger(swagger, callback) {
      SwaggerParser.dereference(swagger)
        .then(function (api) {
          callback(null, api)
        });
    }
  }
}
