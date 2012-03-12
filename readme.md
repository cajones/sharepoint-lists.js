# sharepoint-lists.js

just some sharepoint list grabbing code


    $(document).ready(function () {
      var listSource = new Sharepoint.ListSource({ url: '//mysharepoint.com/sites/blah/portal/_vti_bin/lists.asmx' });
      var wrapAndAppend = function (selector, value) {
          $(selector).append($('<option>').append(value));
      };
      listSource.load('BestPracticeUploadList', ["Main", "DateCreated"], function (results) {
   
          $.each(results, function (index, values) {
              wrapAndAppend('#Main', values[0]);
              wrapAndAppend('#DateCreated', values[1]);
          });
   
      });
    });
