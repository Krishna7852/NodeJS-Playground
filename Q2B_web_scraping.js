/* 
Q2(B). Code a  nodes script which can scrape the movies currently in the "Box office" 
from IMDB's homepage (https://www.imdb.com/chart/boxoffice/), list them and get the list of 
cast for each of them. The script should be able to take a parameter to specify that only 
show details of TOP 'N' movies. 
*/
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class webScraping {

    constructor() {
        this.dom = null;
        this.window = null;
        this.url_dom = [];
    }

    async loadUrl(url) {
        this.dom = await JSDOM.fromURL(url, {});
        return this.dom.window;
    }

    async getMoviesList(url, N) {
        this.window = await this.loadUrl(url);
        const eleList = this.window.document.getElementsByClassName("titleColumn");
        const moviesList = {};
        const movieN = eleList.length;
        if ( N !== undefined ) {
            movieN = movieN > (N || 0) ? N : movieN;
        }
        
        for (let i = 0; i < movieN; i++) {
            const innerHref = eleList[i].children[0].href.split('?')[0];
            const innerDom = await JSDOM.fromURL(innerHref + '/fullcredits', {});
            const castListEle = innerDom.window.document.getElementsByClassName("cast_list");
            const table = castListEle[0] || {};
            const castList = [];
            if ( table.rows.length  > 1 ) {
                for (let j = 1; j < table.rows.length; j++) {
                    if(table.rows[j].cells[1])
                        castList.push(table.rows[j].cells[1].textContent.trim());
                }
            }
            moviesList[eleList[i].textContent.trim()] = castList;
        }
        return moviesList;
    }
}
async function  main() {
    const ws = new webScraping();
    const movies_with_cast = await ws.getMoviesList("https://www.imdb.com/chart/boxoffice/");
    console.log(movies_with_cast);
}

main();