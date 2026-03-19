export interface Album {
  id: string; title: string; artist: string; year: number; label: string;
  format: 'LP' | 'CD' | 'CASSETTE' | 'COLLECTIBLE';
  seed: string; genres: string[];
  condition: 'NEW' | 'USED_MINT' | 'USED_GOOD' | 'USED_FAIR';
  price: number; origPrice?: number; stock: number;
  rating: number; criticRating: number; reviews: number;
  desc: string; seller: string; sellerRating: number; sale: boolean;
  tracklist: { pos: string; title: string; dur: string }[];
}

export const ALBUMS: Album[] = [
  { id:'1', title:'Kind of Blue', artist:'Miles Davis', year:1959, label:'Columbia Records', format:'LP', seed:'kindofblue', genres:['Jazz','Modal Jazz'], condition:'NEW', price:189.90, origPrice:220, stock:3, rating:4.9, criticRating:5.0, reviews:2847, sale:true, seller:'JazzVault', sellerRating:4.9, desc:'First pressing reissue. 180g audiophile vinyl. Uma das gravações mais influentes da história do jazz. Miles Davis criou uma nova linguagem musical com este álbum revolucionário.', tracklist:[{pos:'A1',title:'So What',dur:'9:22'},{pos:'A2',title:'Freddie Freeloader',dur:'9:46'},{pos:'A3',title:'Blue in Green',dur:'5:37'},{pos:'B1',title:'All Blues',dur:'11:33'},{pos:'B2',title:'Flamenco Sketches',dur:'9:26'}] },
  { id:'2', title:'OK Computer', artist:'Radiohead', year:1997, label:'Parlophone', format:'LP', seed:'okcomputer', genres:['Alternative Rock','Art Rock'], condition:'USED_MINT', price:145, stock:1, rating:4.8, criticRating:4.9, reviews:5231, sale:false, seller:'AlternativeArch', sellerRating:4.7, desc:'Original UK pressing. Minimal wear. Uma visão profética do século XXI, este álbum permanece como uma das declarações mais poderosas do rock alternativo.', tracklist:[{pos:'A1',title:'Airbag',dur:'4:44'},{pos:'A2',title:'Paranoid Android',dur:'6:23'},{pos:'B1',title:'Let Down',dur:'4:59'},{pos:'B2',title:'Karma Police',dur:'4:21'},{pos:'C1',title:'No Surprises',dur:'3:48'}] },
  { id:'3', title:'To Pimp a Butterfly', artist:'Kendrick Lamar', year:2015, label:'Aftermath', format:'LP', seed:'tpab', genres:['Hip Hop','Jazz Rap'], condition:'NEW', price:175, stock:4, rating:4.9, criticRating:5.0, reviews:12044, sale:false, seller:'HipHopHeads', sellerRating:4.9, desc:'Original 2015 pressing. Double LP. 180g. Uma declaração artística grandiosa que sintetiza a história da música negra. Álbum da década.', tracklist:[{pos:'A1',title:"Wesley's Theory",dur:'4:46'},{pos:'B1',title:'King Kunta',dur:'3:54'},{pos:'C1',title:'These Walls',dur:'5:01'},{pos:'D1',title:'Alright',dur:'3:39'}] },
  { id:'4', title:'Random Access Memories', artist:'Daft Punk', year:2013, label:'Columbia', format:'LP', seed:'randomaccess', genres:['Eletrônico','Disco'], condition:'NEW', price:210, origPrice:260, stock:5, rating:4.6, criticRating:4.5, reviews:8912, sale:true, seller:'ElectroPlanet', sellerRating:4.8, desc:'2013 original pressing. Sealed. Gatefold sleeve. A declaração mais expansiva e humana de Daft Punk — 180g vinyl.', tracklist:[{pos:'A1',title:'Give Life Back to Music',dur:'4:34'},{pos:'B1',title:'Giorgio by Moroder',dur:'9:04'},{pos:'C1',title:'Instant Crush',dur:'5:37'},{pos:'D1',title:'Get Lucky',dur:'6:09'}] },
  { id:'5', title:'The Dark Side of the Moon', artist:'Pink Floyd', year:1973, label:'Harvest', format:'LP', seed:'darkside', genres:['Rock Progressivo','Psicodélico'], condition:'USED_GOOD', price:299, origPrice:350, stock:1, rating:4.9, criticRating:5.0, reviews:18932, sale:true, seller:'ProgRockVault', sellerRating:4.9, desc:'Original UK 1st pressing SHVL 804. Stickered sleeve. Complete with posters and stickers originais. Uma das primeiras prensagens em excelente estado.', tracklist:[{pos:'A1',title:'Speak to Me / Breathe',dur:'3:58'},{pos:'A2',title:'Time',dur:'7:06'},{pos:'B1',title:'Money',dur:'6:22'},{pos:'B2',title:'Us and Them',dur:'7:49'}] },
  { id:'6', title:'Nevermind', artist:'Nirvana', year:1991, label:'DGC Records', format:'CD', seed:'nevermind', genres:['Grunge','Alternative Rock'], condition:'NEW', price:45, stock:8, rating:4.7, criticRating:4.8, reviews:22451, sale:false, seller:'GrungeArchive', sellerRating:4.6, desc:'Remastered edition. Jewel case com booklet original. O álbum que trouxe o rock alternativo para o mainstream mundial.', tracklist:[{pos:'1',title:'Smells Like Teen Spirit',dur:'5:01'},{pos:'2',title:'In Bloom',dur:'4:14'},{pos:'3',title:'Come as You Are',dur:'3:38'},{pos:'4',title:'Lithium',dur:'4:17'}] },
  { id:'7', title:'Thriller', artist:'Michael Jackson', year:1982, label:'Epic Records', format:'LP', seed:'thriller', genres:['Pop','R&B','Funk'], condition:'NEW', price:160, origPrice:200, stock:3, rating:4.8, criticRating:4.9, reviews:31204, sale:true, seller:'PopLegends', sellerRating:4.8, desc:'40th Anniversary Edition. 180g remastered vinyl. Gatefold sleeve. O álbum mais vendido de todos os tempos.', tracklist:[{pos:'A1',title:"Wanna Be Startin' Somethin'",dur:'6:02'},{pos:'A4',title:'Thriller',dur:'5:57'},{pos:'B1',title:'Beat It',dur:'4:17'},{pos:'B2',title:'Billie Jean',dur:'4:54'}] },
  { id:'8', title:'Homogenic', artist:'Björk', year:1997, label:'One Little Indian', format:'LP', seed:'homogenic', genres:['Art Pop','Eletrônico'], condition:'USED_MINT', price:220, stock:1, rating:4.8, criticRating:4.9, reviews:3156, sale:false, seller:'ArtPop_Records', sellerRating:4.8, desc:'Original 1997 UK pressing. Mint condition. Stored in protective sleeve.', tracklist:[{pos:'A1',title:'Hunter',dur:'4:02'},{pos:'A2',title:'Jóga',dur:'5:05'},{pos:'B2',title:'All Is Full of Love',dur:'4:45'}] },
  { id:'9', title:'Purple Rain', artist:'Prince', year:1984, label:'Warner Bros.', format:'LP', seed:'purplerain', genres:['Funk','Pop','R&B'], condition:'USED_MINT', price:195, stock:1, rating:4.9, criticRating:4.9, reviews:7832, sale:false, seller:'PurpleVault', sellerRating:4.9, desc:'Original 1984 pressing. Nearly mint. Includes original poster.', tracklist:[{pos:'A1',title:"Let's Go Crazy",dur:'4:39'},{pos:'B1',title:'When Doves Cry',dur:'5:54'},{pos:'B4',title:'Purple Rain',dur:'8:41'}] },
  { id:'10', title:'Born to Run', artist:'Bruce Springsteen', year:1975, label:'Columbia', format:'CASSETTE', seed:'borntorun', genres:['Rock','Heartland Rock'], condition:'USED_GOOD', price:35, stock:2, rating:4.7, criticRating:4.9, reviews:4521, sale:false, seller:'CassetteRevival', sellerRating:4.5, desc:'Original cassette. Works perfectly. Label intact.', tracklist:[{pos:'A1',title:'Thunder Road',dur:'4:49'},{pos:'B1',title:'Born to Run',dur:'4:31'},{pos:'B2',title:'Jungleland',dur:'9:33'}] },
  { id:'11', title:'I Put a Spell on You', artist:'Nina Simone', year:1965, label:'Philips', format:'LP', seed:'ninaspell', genres:['Jazz','Soul','Blues'], condition:'USED_GOOD', price:98, stock:2, rating:4.7, criticRating:4.8, reviews:1204, sale:false, seller:'SoulDigger', sellerRating:4.6, desc:'Original pressing. Light surface marks but plays perfectly.', tracklist:[{pos:'A1',title:'I Put a Spell on You',dur:'4:15'},{pos:'A2',title:'Tomorrow Is My Turn',dur:'3:32'},{pos:'B1',title:'Ne me quitte pas',dur:'4:48'}] },
  { id:'12', title:'Discovery', artist:'Daft Punk', year:2001, label:'Virgin Records', format:'CD', seed:'discovery', genres:['Eletrônico','House','Disco'], condition:'USED_MINT', price:55, stock:4, rating:4.7, criticRating:4.6, reviews:9134, sale:false, seller:'ElectroPlanet', sellerRating:4.8, desc:'Original 2001 pressing. Near mint. With robot face booklet.', tracklist:[{pos:'1',title:'One More Time',dur:'5:20'},{pos:'2',title:'Aerodynamic',dur:'3:27'},{pos:'3',title:'Digital Love',dur:'4:58'}] },
];

export const fmtPrice = (n: number) => `R$ ${n.toFixed(2).replace('.', ',')}`;
export const fmtStars = (r: number) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));

export const COND_LABEL: Record<string, string> = {
  NEW: '🆕 Novo', USED_MINT: '💎 Menta', USED_GOOD: '✅ Bom', USED_FAIR: '⚠️ Regular',
};

export const VALID_COUPONS: Record<string, number> = {
  VINYL10: 10, FIRSTORDER: 15, COLLECTOR20: 20, VINYLVERSE5: 5,
};

export const SHIP_OPTS = [
  { id: 'pac',    name: 'Correios PAC',   price: 18.50, days: 8 },
  { id: 'sedex',  name: 'Correios SEDEX', price: 34.90, days: 3 },
  { id: 'jadlog', name: 'JadLog Package', price: 22.00, days: 5 },
];
