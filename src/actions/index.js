import ReactDOM from 'react-dom';
import axios from 'axios';

export const getData = (page) => {
  return dispatch => {
     
    axios.get( `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=6b38ea75acc26996180a238979867806&safe_search=1&page=${page}&format=json&nojsoncallback=1`)
    .then(res =>
      dispatch({
        type: "FETCH_DATA",
        data: res.data
      })
    );
  };
}
