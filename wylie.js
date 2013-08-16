//var reader = new FileReader();
//var contents;
//reader.onload = function(event) {
  //contents = event.target.result;
  //console.log(contents);
//};

//var lines = contents.split('\n');
var alpha = [   'ka', 'kha', 'ga', 'nga',
                'ca', 'cha', 'ja', 'nya',
                'ta', 'tha', 'da', 'na',
                'pa', 'pha', 'ba', 'ma',
                'tsa','tsha','dza','wa',
                'zha', 'za', "'", 'ya',
                'ra', 'la', 'sha', 'sa',
                'ha'
            ];

var alph  = [   'k', 'kh', 'g', 'ng',
                'c', 'ch', 'j', 'ny',
                't', 'th', 'd', 'n',
                'p', 'ph', 'b', 'm',
                'ts','tsh','dz','w',
                'zh', 'z', "'", 'y',
                'r', 'l', 'sh', 's',
                'h'
            ];


var lex = {
    k: 0,   kh: 1, g: 2,    ng: 3,
    c: 4,   ch: 5, j: 6,    ny: 7,
    t: 8,   th: 9, d: 10,   n: 11,
    p: 12,  ph: 13, b: 14,  m: 15, ts: 16,  tsh: 17,
    dz: 18, w: 19,
    zh: 20, z: 21, "\'": 22,y: 23,
    r: 24,  l: 25, sh: 26,  s: 27,
    h: 28,  a: 29, i: 30, u: 31, e: 32, o:33,
    check: function(a, b) {   // a first if return is negative
        return (lex[a] - lex[b]);
    },
    compare: function(s, t) {
        var x = s.split('');
        var y = t.split('');
        var i = 0;

        while(true) {

            if(i > s.length) {
                return t;
            }
            else if(i > t.length) {
                return s;
            }
            else if(lex.check(x[i], y[i]) === 0) {
                i++;
                continue;
            }
            else {
                var res = lex.check(x[i], y[i]);
                return res < 0 ? s : t;
            }
            i++;

        }

    }

};

var vowels = {
    a: 0, i: 1,
    u: 2, e: 3,
    o: 4
};

var syllable = {
    str: "",
    prefix: "",
    suprscrib: "",
    root: "",
    vowel: "",
    suffix: "",
    secsuff: ""
};

var regex = {
    // Single letter with no vowel modifier
    one: /^(?:[kctpzs]h|n[gy]|tsh?|dz)a?$|^[kgcjtdnpbmwzmyrlsh']a?$/gm,
    // Single letter with common vowel modifier
    two: /^(?:[kctpzs]h|n[gy]|tsh?|dz)[iueo]$|^(?=dza)$|^[kgcjtdnpbmwzmyrlsh'][iueo]$/gm,
    // Prefix with no vowel
    three_pre: /^(?!dz)a?[gdbm'](?:(?:[kctpzs]h|n[gy]|tsh?|dz)|[kgcjtdnpbzmsh'])a?$/gm,
    // Prefix with common vowel modifier
    three_pre_vow: /^(?!dz[ieuo])[gdbm'](?:(?:[kctpzs]h|n[gy]|tsh?|dz)|[kgcjtdnpbzmsh'])[ieou]$/gm,
    // three_pre_vow: /^[gdbm'](?:[kctpzs]h|n[gy]|tsh?|dz)[iueo]$|^(?!dz[iueo])([gdbm'])[kgcjtdnpbzmsh'][iueo]$/gm,
    // Superscribed with no vowel modifier
    three_supr: /^(?:r(?:[kgjtdnbm]|n[gy]|ts|dz)a?$|^l(?:[kgcjtdpbh]|ng|ch)a?$|^s(?:[kgtdnpbm]|n[gy]|ts)a?)$/gm,
    // three_supr: /^(r(?:[kgjtdnbm]|n[gy]|ts|dz))a?$|^(l(?:[kgcjtdpbh]|ng|ch))a?$|^(s(?:[kgtdnpbm]|n[gy]|ts)a?)$/gm,
    // Superscribed with common vowel modifier
    three_supr_vow: /^(r(?:[kgjtdnbm]|n[gy]|ts|dz))[iueo]$|^(l(?:[kgcjtdpbh]|ng|ch))[iueo]$|^(s(?:[kgtdnpbm]|n[gy]|ts)[iueo])$/gm,
    // Subscribed with no vowel modifier
    three_sub: /^(?:[kgpbmh]|[kp]h)ya?$|^(?:[kgtdnpbmsh]|[ktp]h)ra?$|^[kgbrsz]la?$|^(?:[kgdzrlh]|[kzs]h|(ts)h?|ny)wa?$/gm,
    // Subscribed with common vowel modifier
    three_sub_vow: /^(?:[kgpbmh]|[kp]h)y[iueo]?$|^(?:[kgtdnpbmsh]|[ktp]h)r[iueo]?$|^[kgbrsz]l[iueo]?$|^(?:[kgdzrlh]|[kzs]h|(ts)h?|ny)w[iueo]?$/gm,
    // Supersribed and subscribed with no vowel modifier
    sup_sub: /^(r([kgbm]ya?|[kgnbm]ra?|[kgb]la?|(?:[kg]|ts|ny)wa?))$|^(l([kgpbh]ya?|[kgdpbh]ra?|[kgb]la?|[kgdlh]wa?))$|^(s([kgpbm]ya?|[kgtdnpbm]ra?|[kgb]la?|[kgd](?:ts|ny)wa?))$/gm,
    // Supersribed and subscribed with common vowel modifier
    sup_sub_vow: /^(r([kgbm]y[iueo]|[kgnbm]r[iueo]|[kgb]l[iueo]|(?:[kg]|ts|ny)w[iueo]))$|^(l([kgpbh]y[iueo]|[kgdpbh]r[iueo]|[kgb]l[iueo]|[kgdlh]w[iueo]))$|^(s([kgpbm]y[iueo]|[kgtdnpbm]r[iueo]|[kgb]l[iueo]|[kgd](?:ts|ny)w[iueo]))$/gm,
    // Prefix with suffix.
    pre_suf: /^[gdbm'](?:[kctpzs]h|n[gy]|tsh?|dz)a?(?:[gdnbm'rls]|ng)$|^(?!dz)a?^[gdbm'][kgcjtdnpbzmsh']a?(?:[gdnbm'rls]|ng)$/gm,
    // Prefix with suffix and vowel.
    pre_suf_vow: /^[gdbm'](?:[kctpzs]h|n[gy]|tsh?|dz)[iueo](?:[gdnbm'rls]|ng)$|^(?!dz[iueo])[gdbm'][kgcjtdnpbzmsh'][iueo](?:[gdnbm'rls]|ng)$/gm,
    // suffix and 2nd suffix with no vowel
    suff2: /^(?:[kctpzs]h|n[gy]|tsh?|dz)a?(?:[gdnbm'rls]|ng)(?:s|d)$|^[kgcjtdnpbmwzmyrlsh']a?(?:[gdnbm'rls]|ng)(?:s|d)$/gm,
    // suffix and 2nd suffix with vowel modifier
    suff2_vow: /^(?:[kctpzs]h|n[gy]|tsh?|dz)[iueo](?:[gdnbm'rls]|ng)(?:s|d)$|^[kgcjtdnpbmwzmyrlsh'][iueo](?:[gdnbm'rls]|ng)(?:s|d)$/gm
};

// Returns 1 if single character, 2 if multi and 0 for no match.
function parse(s) {
    if (regex.one.test(s))
        return 1;
    else if (regex.two.test(s))
        return 2;
    else if (regex.three_pre.test(s))
        return 3;
    else if (regex.three_pre_vow.test(s))
        return 4;
    else if (regex.three_supr.test(s))
        return 5;
    else if (regex.three_supr_vow.test(s))
        return 6;
    else if (regex.three_sub.test(s))
        return 7;
    else if (regex.three_sub_vow.test(s))
        return 8;
    else
        return 0;
}

function forEach(array, action) {
    for (var i = 0; i < array.length; i++) {
        action(array[i]);
    }
}

function map(func, array) {
    var result = [];
    forEach (array, function(elem) {
        result.push(func(elem));
    });
    return result;
}


function test(s) {
    var result = (map(parse, s));
    for (var i = 0; i < result.length; i++) {
        console.log(s[i] + ":" + result[i]);
    }
}

exports.regex = Object.create(regex);
exports.alpha = Object.create(alpha);
exports.alph = Object.create(alph);
exports.map = Object.create(map);

// var result = lex.check("\'", "k");
// console.log(result);
//   var result = lex.check("\'", "k");
// function translate(st, syl) {
//   syl.str = st;
//   var chars = '';
//     syl.str = st;
//     if(st.length == 1) {
//         syl.root = st;
//     if(st in vowels)
//       syl.vowel = st;
//     }
//     else {
//     chars = st.split('');
//     }
//       chars = st.split('');
//   if(st.length == 2) {
//     if(!(chars[0] in prefixes)) {

//     }
//   }
//   var i = 0;
//   for(var s in chars) {
//     if(s in vowels){
//       syl.vowel = s;
//       syl.root = (i > 0) ? chars[i - 1] : chars[i];
//     }
//     i++;
//   }

//   return syl;
// }
// var a = "ka ba";
// var b = "ra sha";
// var res = lex.compare(a, b);
// //var res = lex.compare("ka", "ra");
// console.log(a + " and " + b + "?? \nWell, " + res + " is first.");
//   //var res = lex.compare("ka", "ra");
//   //console.log(res);
