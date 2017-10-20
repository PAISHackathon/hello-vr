import flickr from "./flickr";
import tmdb from "./tmdb";
const ds = {
  flickr,
  tmdb
};

export default {
  from(source) {
    return ds[source];
  }
};
