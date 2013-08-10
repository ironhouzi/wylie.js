reg = require ("../wylie.js");

function forEach(array, check, exp, state) {
    for (var i = 0; i < array.length; i++) {
        if(state)
            check(array[i]).toMatch(exp);
        else
            check(array[i]).not.toMatch(exp);
    }
}

var vowels = ["i", "u", "e", "o"];

function addvow() {
    var result = [];
    for (var i = 0; i < reg.alph.length; i++) {
        for (var j = 0; j < vowels.length; j++)
            result.push(reg.alph[i] + vowels[j]);
    }
    return result;
}

var sin_sub = [
    "bla", "bra", "bya", "bza", "cha", "dra", "dva", "dwa", "dza",
    "gla", "gra", "gva", "gwa", "gya", "gza", "hra", "hva", "hwa",
    "hya", "kha", "kla", "kra", "ksa", "kwa", "kya", "l'a", "lba",
    "lca", "lda", "lga", "lha", "lka", "lpa", "lta", "lva", "lwa",
    "mra", "mya", "nga", "nya", "pha", "pra", "pya", "r'a", "rba",
    "rda", "rga", "rja", "rka", "rla", "rma", "rna", "rta", "rva",
    "rwa", "rya", "sba", "sda", "sga", "sha", "ska", "sla", "sma",
    "sna", "spa", "sra", "sta", "sva", "swa", "sya", "tha", "tra",
    "tsa", "tva", "twa", "tya", "zha", "zla", "zwa"
];

var pre = [
    "'ba", "'da", "'ja", "'ma", "'na", "bca", "bga", "bha", "bka",
    "bna", "dba", "dda", "dga", "dha", "dka", "dma", "dpa", "g'a",
    "gba", "gga", "gha", "gka", "gma", "gna", "gsa", "gta", "mba",
    "mda", "mga", "mna"
];

var pre_vow = [
    "'be", "'bi", "'bo", "'bu", "'che", "'chi", "'cho", "'chu", "'cu", "'de",
    "'di", "'do", "'du", "'dzi", "'dzo", "'dzu", "'gi", "'go", "'gu", "'je",
    "'ji", "'jo", "'ju", "'kho", "'khu", "'ku", "'pe", "'pho", "'phu", "'the",
    "'tho", "'thu", "'tse", "'tshe", "'tsho", "'tso", "'tu", "'zhu", "bce",
    "bchu", "bco", "bcu", "bde", "bdo", "bdu", "bgo", "bgu", "bhe", "bhi",
    "bho", "bhu", "bki", "bko", "bku", "bnu", "bpo", "bse", "bshe", "bshi",
    "bsho", "bshu", "bso", "bsu", "bti", "btse", "btso", "btsu", "btu", "bze",
    "bzhi", "bzho", "bzhu", "bzi", "bzo", "bzu", "dbe", "dbo", "dbu", "ddi",
    "dge", "dgi", "dgo", "dgu", "dhe", "dhi", "dho", "dhu", "dku", "dme",
    "dmo", "dmu", "dnge", "dngo", "dpe", "dpo", "dpu", "gbu", "gce", "gci",
    "gco", "gcu", "gdu", "ghe", "ghi", "gho", "ghu", "gku", "gne", "gno",
    "gnu", "gnye", "gnyi", "gse", "gshe", "gshi", "gsho", "gshu", "gso",
    "gsu", "gte", "gti", "gto", "gtse", "gtsi", "gtso", "gtu", "gze", "gzhe",
    "gzhi", "gzho", "gzhu", "gzi", "gzo", "gzu", "mbu", "mche", "mchi",
    "mcho", "mchu", "mci", "mdo", "mdze", "mdzo", "mdzu", "mgo", "mgu",
    "mje", "mkhe", "mkho", "mkhu", "mko", "mngo", "mno", "mnye", "mnyo",
    "mthe", "mtho", "mthu", "mtse", "mtshe", "mtsho", "mtso"
];

var sin_vow = [
    "be", "bi", "bo", "bu", "ce", "ci", "co",
    "cu", "de", "di", "do", "du", "ge", "gi",
    "go", "gu", "he", "hi", "ho", "hu", "je",
    "ji", "jo", "ju", "ke", "ki", "ko", "ku",
    "le", "li", "lo", "lu", "me", "mi", "mo",
    "mu", "ne", "ni", "no", "nu", "pe", "pi",
    "po", "pu", "re", "ri", "ro", "ru", "se",
    "si", "so", "su", "te", "ti", "to", "tu",
    "we", "wi", "wo", "wu", "ye", "yi",
    "yo", "yu", "ze", "zi", "zo", "zu", "zhu",
    "chi", "cho", "chu", "dze", "dzi", "dzo", "dzu",
    "khe", "khi", "kho", "khu", "nge", "ngi", "ngo",
    "ngu", "she", "shi", "sho", "shu", "the", "thi",
    "tho", "thu", "tse", "tsi", "tso", "tsu", "zhe",
    "zhi", "zho",
];

var r = reg.regex;

// ka, ga, nga, ha, tsha, etc..
describe("Test single letter with no vowel modifier", function() {

    var singlevow = [];
    var exp = r.one;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(reg.alph, expect, exp, true);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["rag", "sar", "las"], expect, exp, false);
    });

    it("Checks for false positives: has vowel modifier", function() {
        forEach(singlevow, expect, exp, false);
    });

    it("Checks for false positives: has vowel modifier", function() {
        forEach(sin_vow, expect, exp, false);
    });

    it("Checks for false positives: has prefix", function() {
        forEach(pre, expect, exp, false);
    });

    it("Checks for false positives: has prefix and vowel", function() {
        forEach(pre_vow, expect, exp, false);
    });

//TODO Add checks!
    xit("Checks for false positives: has superscibed", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has supersribed and vowel", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has subscript", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has subscript and vowel ", function() {
        forEach([], expect, exp, false);
    });

});

// ko, ge, ngo, hi, tshu, etc..
describe("Test single letter with common vowel modifier", function() {

    var singlevow = [];
    var exp = r.two;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(sin_vow, expect, exp, true);
    });

    it("Checks single letter with common vowel modifer", function() {
        forEach(singlevow, expect, exp, true);
    });

    it("Checks single letter for false positives: no vowel", function() {
        forEach(reg.alph, expect, exp, false);
    });

    it("Checks single letter for false positives: common vowel", function() {
        forEach(reg.alpha, expect, exp, false);
    });

    it("Checks single letter for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

    it("Checks for false positives: has prefix", function() {
        forEach(pre, expect, exp, false);
    });

    it("Checks for false positives: has prefix and vowel", function() {
        forEach(pre_vow, expect, exp, false);
    });

//TODO Add checks!
    xit("Checks for false positives: has superscibed", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has supersribed and vowel", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has subscript", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has subscript and vowel ", function() {
        forEach([], expect, exp, false);
    });

});

// dga, bda, 'da, mra, etc
describe("Test for syllable with prefix and no vowel", function() {

    var singlevow = [];
    var exp = r.three_pre;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(pre, expect, exp, true);
    });

    it("Checks for false positives: has prefix and vowel", function() {
        forEach(pre_vow, expect, exp, false);
    });

    it("Checks for false positives: common vowel modifer", function() {
        forEach(sin_vow, expect, exp, false);
    });

    it("Checks for false positives: common vowel modifer", function() {
        forEach(singlevow, expect, exp, false);
    });

    it("Checks for false positives: no prefix and no vowel", function() {
        forEach(reg.alph, expect, exp, false);
    });

    it("Checks for false positives: no prefix with common vowel", function() {
        forEach(reg.alpha, expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["brag", "gsar", "'las"], expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

//TODO Add checks!
    xit("Checks for false positives: has superscibed", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has supersribed and vowel", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has subscript", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has subscript and vowel ", function() {
        forEach([], expect, exp, false);
    });

});

// dgo, bde, 'di, mbu, etc
describe("Test for syllable with prefix and common vowel modifier", function() {

    var singlevow = [];
    var exp = r.three_pre_vow;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(pre_vow, expect, exp, true);
    });

    it("Checks for false positives: has prefix and no vowel", function() {
        forEach(pre, expect, exp, false);
    });

    it("Checks for false positives: common vowel modifer", function() {
        forEach(sin_vow, expect, exp, false);
    });

    it("Checks for false positives: common vowel modifer", function() {
        forEach(singlevow, expect, exp, false);
    });

    it("Checks for false positives: no prefix and no vowel", function() {
        forEach(reg.alph, expect, exp, false);
    });

    it("Checks for false positives: no prefix with common vowel", function() {
        forEach(reg.alpha, expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["brag", "gsar", "'las"], expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

//TODO Add checks!
    xit("Checks for false positives: has superscibed", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has supersribed and vowel", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has subscript", function() {
        forEach([], expect, exp, false);
    });

    xit("Checks for false positives: has subscript and vowel ", function() {
        forEach([], expect, exp, false);
    });

});

xdescribe("Test single letter with common vowel modifier", function() {

    var singlevow = [];
    var exp = r.two;

    beforeEach(function() {
        singlevow = addvow();
    });

    it("Checks prefix with no vowel modifier", function() {
        var false_words = ["tram", "ram", "rma"];
        var exp = r.three_pre;

        forEach(singlevow, expect, exp, false);
        forEach(pre, expect, exp, true);
        forEach(false_words, expect, exp, false);
        forEach(reg.alpha, expect, exp, false);
        forEach(reg.alph, expect, exp, false);
        forEach(sin_sub, expect, exp, false);
    });

    it("Checks prefix with common vowel modifier", function() {

        var exp = r.three_pre_vow;

        forEach(singlevow, expect, exp, false);
        forEach(pre, expect, exp, false);
        forEach(reg.alph, expect, exp, false);
        forEach(sin_sub, expect, exp, false);
        forEach(pre_vow, expect, exp, true);
    });

    xit("Checks single letter with no wovel", function() {
        var true_words = ["sha", "ra"];
        var false_words = ["she", "ri", "rad"];

        forEach(true_words, expect, r.one, true);
        forEach(false_words, expect, r.one, false);
    });

    xit("Checks single letter with no wovel", function() {
        var true_words = ["sha", "ra"];
        var false_words = ["she", "ri", "rad"];

        forEach(true_words, expect, r.one, true);
        forEach(false_words, expect, r.one, false);
    });

    xit("Checks single letter with no wovel", function() {
        var true_words = ["sha", "ra"];
        var false_words = ["she", "ri", "rad"];

        forEach(true_words, expect, r.one, true);
        forEach(false_words, expect, r.one, false);
    });

    xit("Checks single letter with no wovel", function() {
        var true_words = ["sha", "ra"];
        var false_words = ["she", "ri", "rad"];

        forEach(true_words, expect, r.one, true);
        forEach(false_words, expect, r.one, false);
    });
});
