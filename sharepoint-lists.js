window['Sharepoint'] = window['Sharepoint'] || {};
window.Sharepoint.SoapFormatter = {
    createRequestForListItems: function (listName, fieldNames) {
        var pre = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> \
                          <soapenv:Body> \
                            <GetListItems xmlns="http://schemas.microsoft.com/sharepoint/soap/"> \
                              <listName>' + listName + '<\/listName> \
                                  <viewFields> \
                                    <ViewFields>';
        var post = '<\/ViewFields> \
                      <\/viewFields> \
                    <\/GetListItems> \
                  <\/soapenv:Body> \
                <\/soapenv:Envelope>';
        var fieldsElement = '';
        for (i = 0; i < fieldNames.length; i++) {
            fieldsElement += '<FieldRef Name="' + fieldNames[i] + '" />';
        }
        return pre + fieldsElement + post;
    },
    getResponseFieldName: function (fieldName) {
        return "ows_" + fieldName;
    }
};
window.Sharepoint.ListSource = function (options) {
    this.$ = options.jQuery || window['jQuery'];
    this.soapFormatter = options.soapFormatter || Sharepoint.SoapFormatter;
    this.url = options.url;
};
window.Sharepoint.ListSource.prototype.load = function (listName, fieldNames, callback) {
    var self = this;
    fieldNames = self.$.isArray(fieldNames) ? fieldNames : [fieldNames];
    self.$.ajax({
        url: this.url,
        type: "POST",
        dataType: "xml",
        data: self.soapFormatter.createRequestForListItems(listName, fieldNames),
        complete: function (data, status) {
            var results = [];
            self.$(data.responseXML).find("z\\:row").each(function (index, row) {
                var cols = [];
                self.$.each(fieldNames, function (index, field) {
                    cols.push(row.getAttribute(self.soapFormatter.getResponseFieldName(field)));
                });a
                results.push(cols);
            });
            if (callback) callback(results);
        },
        contentType: "text/xml; charset=\"utf-8\""
    });
};
