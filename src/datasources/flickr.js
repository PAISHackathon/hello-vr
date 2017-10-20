const config = require("../config.js");
console.log("flickr", config);
const Flickr = require("flickr-sdk"),
  flickr = new Flickr(config.FLICKR_API_KEY),
  debug = require("debug")("datasource:flickr");

export default {
  search(text = "doggo") {
    let self = this;
    let photos = flickr.photos.search({
      text,
      safe_search: 1,
      sort: "relevance",
      privacy_filter: 1, // public
      per_page: 50
    });

    console.log("photos", photos);
    return photos
      .then(function(res) {
        //console.log("yay!", res.body);
        // https://www.flickr.com/services/api/misc.urls.html
        return res.body.photos? self.normalize(res.body): [];
      })
      .catch(function(err) {
        console.log("bonk", err);
        return [];
      });
  },
  normalize(body) {
    console.log("nomarlize photo", body);
    let self = this;
    return {
      results: body.photos.photo.map(function(el) {
        return {
          id: el.id,
          title: el.title,
          src: self.imagify(el)
        };
      }, this)
    };
  },
  imagify(el) {
    return `https://farm${el.farm}.staticflickr.com/${el.server}/${el.id}_${el.secret}_c.jpg`;
  },
  example() {
    return Promise.resolve(
      this.normalize({ "photos": { "page": 1, "pages": "269", "perpage": 20, "total": "5372", 
      "photo": [
        { "id": "34316324972", "owner": "130808023@N03", "secret": "63f6d43e43", "server": "4164", "farm": 5, "title": "doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "34476249055", "owner": "130808023@N03", "secret": "848b8a88df", "server": "4165", "farm": 5, "title": "doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "34476249875", "owner": "130808023@N03", "secret": "a3851e723a", "server": "4187", "farm": 5, "title": "doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "36204577120", "owner": "135574070@N04", "secret": "5972195093", "server": "4359", "farm": 5, "title": "Doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "32454536283", "owner": "146612069@N04", "secret": "c303a84f81", "server": "3857", "farm": 4, "title": "Doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "34889139644", "owner": "141773019@N02", "secret": "187e652644", "server": "4071", "farm": 5, "title": "Doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "33119578420", "owner": "151385899@N08", "secret": "9ee7df7bc5", "server": "3767", "farm": 4, "title": "Doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "34306988811", "owner": "139566703@N04", "secret": "5c22dd2353", "server": "4156", "farm": 5, "title": "Doggo 2", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "34306989311", "owner": "139566703@N04", "secret": "75b86b9d2f", "server": "4192", "farm": 5, "title": "Doggo 1", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "34273452870", "owner": "16105932@N06", "secret": "8f16a1c1bb", "server": "4176", "farm": 5, "title": "Doggo!", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "32602140992", "owner": "145309015@N07", "secret": "a201b9c5b4", "server": "582", "farm": 1, "title": "Doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "34998335414", "owner": "141493089@N04", "secret": "d2df3c4c19", "server": "4207", "farm": 5, "title": "doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "23949988441", "owner": "81986602@N07", "secret": "248cc8d074", "server": "5758", "farm": 6, "title": "Doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "34648587681", "owner": "7223322@N05", "secret": "bb2a1e893b", "server": "4188", "farm": 5, "title": "Doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "37699115946", "owner": "128798516@N06", "secret": "aeb9d8bd9a", "server": "4468", "farm": 5, "title": "DOGGOS", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "33957737084", "owner": "71196784@N08", "secret": "a7a0f99ac8", "server": "4199", "farm": 5, "title": "Doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "34979583461", "owner": "149916573@N06", "secret": "41f8a365c9", "server": "4227", "farm": 5, "title": "Doggo!", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "35737819992", "owner": "142954520@N02", "secret": "43bd9588ac", "server": "4232", "farm": 5, "title": "IMG_9712", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "33672581183", "owner": "134445125@N03", "secret": "ca29e435cd", "server": "4187", "farm": 5, "title": "Doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
        { "id": "35698488991", "owner": "127896756@N03", "secret": "0f96fc86a9", "server": "4265", "farm": 5, "title": "Doggo", "ispublic": 1, "isfriend": 0, "isfamily": 0 }
      ] }, "stat": "ok" })
    );
  }
};
