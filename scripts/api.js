import { url, options } from "./constants.js";
import { renderCards, renderLoader } from "./ui.js";

//api işlemler
export class API {
  constructor() {
    this.songs = [];
  }

  //popüler müzikleri için istek atma
  async getPopuler() {
    try {
      //api istek atar
      const res = await fetch(url, options);
      const data = await res.json();
      //class'ta tuttugumuz değişkeni günceller
      this.songs = data.tracks;
    } catch (err) {
      console.log("popüler verileri alırken hata oluştu..", err);
    }
  }

  //aratilan içerige erişme
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=TR&offset=0&limit=20;`,
      options
    );
    const data = await res.json();

      // bize gelen diziyi işliyicez
    // objelerin içerisindeki track katmanını aradan kaldırıcac
    console.log(data.tracks.hits)

    const newData = data.tracks.hits.map((songs) => ({
      ...songs.track,

    }))
    renderCards(newData)
    
  }
}
