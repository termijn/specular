import common from './common';
import '../css/eyecandy.css';

export default {
    template: 
        '<div class="eyecandy">'+
            '<transition name="fade">'+
                '<div v-if="visible">'+
                    '<img v-bind:src="imgurl">'+ 
                '</div>' +
            '</transition>' +
        '</div>',
    data: function() {
        return { 
            visible: false,
            imgurl: '', 
            alt: '',
            urls: [
                'http://www.picgifs.com/graphics/e/eyes/graphics-eyes-662258.gif',
                'http://www.picgifs.com/graphics/e/eyes/graphics-eyes-449207.gif',
                'https://media.giphy.com/media/l2SpYymt1W1pkqb5e/giphy.gif',
                'https://www.collater.al/wp-content/uploads/2013/11/ma_face_mid.gif',
                'https://s-media-cache-ak0.pinimg.com/originals/b4/30/e8/b430e8fbe229dd7b3f3e935c3c9ef730.gif',
                'http://s.pikabu.ru/post_img/2013/11/09/11/1384022136_669507211.gif',
                'http://68.media.tumblr.com/03a435c5e7ba416ef90be272f5170522/tumblr_mu0kp9XwSn1qc0s10o1_500.gif',
                'http://pic.pimg.tw/darthvader/dfdedcfebc895bc48df4db6d765fe8ec.gif',
                'https://s-media-cache-ak0.pinimg.com/originals/2b/bd/44/2bbd44dee42db72974d95f86fea8d3ff.gif',
                'https://s-media-cache-ak0.pinimg.com/originals/d7/e5/06/d7e5061c2e0c73c60bc643e0fddc97ba.gif',
                'https://s-media-cache-ak0.pinimg.com/originals/ff/61/a7/ff61a7034e2d1a4606910ee88f24afac.gif',
                'http://68.media.tumblr.com/2b27908fac782ca54cc2b3aff6862423/tumblr_mra3owkIhC1ro855no1_500.gif',
                'http://www.geekextreme.com/wp-content/uploads/2013/02/fuzzy-gif.gif',
                'http://orig05.deviantart.net/6984/f/2015/019/4/6/120515_480x800_f__by_victhor-d8en0m2.gif',
                'http://38.media.tumblr.com/d1665cbde913b2e495ad24c2579df935/tumblr_n5wio1sTz91tummxoo1_250.gif',
                'https://cdn.shopify.com/s/files/1/0172/2296/products/six_large.gif?v=1403626913',
                'https://s-media-cache-ak0.pinimg.com/originals/73/b2/c1/73b2c1b5cd54e7bb71e6b94a652cb92c.gif',
                'http://66.media.tumblr.com/6c0995048767c190b30f6f1509aeb436/tumblr_nruis5lhIn1qzt4vjo1_500.gif',
                'http://alexandra.ucoz.org/_ph/26/2/114819057.gif',
                'http://gifimage.net/wp-content/uploads/2017/01/Cool-GIF-Image-for-Whatsapp-and-Facebook-7.gif',
                'http://img17.dreamies.de/img/120/b/vaoigmruccd.gif',
                'http://www.ddesignerr.com/wp-content/uploads/2012/05/026.gif',
                'https://s-media-cache-ak0.pinimg.com/originals/6b/d8/ef/6bd8ef35364c9672c7cbb4687977d3ee.gif',
                'http://bestanimations.com/Science/Chemistry/electron-singularity-animated-gif.gif',
                'http://www.webdesignmash.com/trial/wp-content/uploads/2010/02/davidope8.gif',
                'https://s-media-cache-ak0.pinimg.com/originals/1b/99/a4/1b99a402c520a20f69bde73be778c098.gif',
                'http://3.bp.blogspot.com/-gB_29pdcz7g/UXjglip231I/AAAAAAAAD_s/wtojtZXO9AU/s320/pictsel-davidope15.gif',
                'http://1.bp.blogspot.com/_5oJhQAjCd9k/TOFe3bRcgqI/AAAAAAAAAMM/pxOJ_hm8Mps/s1600/supreme_1.gif',
                'https://media.giphy.com/media/9JLl87j7cHisE/giphy.gif',
                'http://68.media.tumblr.com/116333fb96e8686e857b1db8a26fe241/tumblr_myucf1d5VM1spu58bo1_500.gif',
                'http://www.gifimagesdownload.com/wp-content/uploads/2016/02/cute-cool-gifs-333.gif',
                'http://bestanimations.com/Humans/Skulls/skull-animation-gif-2.gif',
                'http://www.gifimagesdownload.com/wp-content/uploads/2016/02/best-cool-gifs-773.gif',
                'https://static.tumblr.com/fc536f36bf2da8ddb6374ba63a89a479/wslnmk1/EvLo1xgf0/tumblr_static_tumblr_static_filename_640.gif',
                'http://orig02.deviantart.net/f176/f/2008/348/f/7/smiley_face_gif_by_sookie_by_sookiesooker.gif',
                'http://static.giga.de/wp-content/uploads/2015/05/face-red-loop-15.emoji_-rcm320x0.gif',
                'https://media.giphy.com/media/l2QDPFF5sQspEy4Q8/giphy.gif',
                'https://media.giphy.com/media/l0HlVlr2guJQmQf5e/giphy.gif',
                'https://media.giphy.com/media/yidUzl5yPUTNyp59F6/giphy.gif',
                'https://media.giphy.com/media/vriJaV5RdhvBC/giphy.gif'
            ]
        
        };
    },
    mounted: function() {
        const self = this;
        
        common.interval(20 * 1000, function(){
            self.visible = false;
            const random = Math.random();
            const index = Math.trunc(random * self.urls.length);
            console.log("EyeCandy index = " + index);
            console.log("EyeCandy url = " + self.urls[index]);
            self.imgurl = self.urls[index];
            setInterval(function() {self.visible = true;}, 10000);
        });
    }
}