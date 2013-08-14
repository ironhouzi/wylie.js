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


var pre_suf = [
"'bang", "'dang", "'gang", "'jang", "'sang", "bcang", "bdang",
"bhang", "bjang", "bkang", "bsang", "btang", "bzang", "dbang",
"dgang", "dmang", "dpang", "gcang", "gdang", "gmang", "gnang",
"gsang", "gtang", "gzang", "mdang", "mgang", "mnang", "'ba'",
"'bab", "'bad", "'bag", "'bal", "'bam", "'ban", "'bar",
"'bas", "'cad", "'da'", "'dab", "'dad", "'dag", "'dal",
"'dam", "'dan", "'dar", "'das", "'ga'", "'gab", "'gad",
"'gag", "'gal", "'gam", "'gan", "'gar", "'gas", "'ja'",
"'jab", "'jag", "'jal", "'jam", "'jan", "'jar", "'jas",
"'kam", "'kan", "'pan", "'zam", "bca'", "bcab", "bcad",
"bcag", "bcal", "bcam", "bcan", "bcar", "bcas", "bda'",
"bdab", "bdag", "bdal", "bdam", "bdan", "bdar", "bdas",
"bgab", "bgad", "bgag", "bgal", "bgam", "bgas", "bha'",
"bhag", "bham", "bhan", "bhas", "bjal", "bka'", "bkab",
"bkad", "bkag", "bkal", "bkam", "bkan", "bkar", "bkas",
"bnas", "bsa'", "bsab", "bsad", "bsag", "bsal", "bsam",
"bsan", "bsar", "bta'", "btab", "btad", "btag", "btam",
"btan", "btar", "btas", "bza'", "bzab", "bzad", "bzag",
"bzal", "bzan", "bzar", "bzas", "dba'", "dbab", "dbad",
"dbag", "dbal", "dban", "dbar", "dbas", "dcal", "ddan",
"dga'", "dgab", "dgad", "dgag", "dgal", "dgan", "dgar",
"dgas", "dhar", "djal", "dka'", "dkad", "dkag", "dkal",
"dkan", "dkar", "dkas", "dma'", "dmab", "dmad", "dmag",
"dman", "dmar", "dmas", "dnar", "dpa'", "dpad", "dpag",
"dpal", "dpar", "dpas", "dsad", "dsar", "gcad", "gcag",
"gcal", "gcam", "gcan", "gcar", "gda'", "gdab", "gdad",
"gdag", "gdal", "gdam", "gdan", "gdar", "gdas", "ghal",
"gham", "ghan", "ghas", "gkag", "gna'", "gnab", "gnad",
"gnag", "gnal", "gnam", "gnan", "gnas", "gsa'", "gsab",
"gsad", "gsag", "gsal", "gsam", "gsan", "gsar", "gsas",
"gta'", "gtab", "gtad", "gtag", "gtal", "gtam", "gtan",
"gtar", "gza'", "gzab", "gzad", "gzag", "gzal", "gzan",
"gzar", "gzas", "mcal", "mda'", "mdag", "mdal", "mdam",
"mdan", "mdar", "mdas", "mga'", "mgal", "mgar", "mjad",
"mjal", "mka'", "mkar", "mna'", "mnab", "mnad", "mnag",
"mnal", "mnam", "mnan", "mnar", "mnas", "mzal"
];

var sup_sub = [
    "rbya", "rgra", "rgya", "rkya", "rmya",
    "sbra", "sgra", "sgya", "skra", "skya", "smra", "smya",
    "spra", "spya", "rtswa"
];


var sup_sub_vow = [
    "lgro", "rgro", "rgyo", "rgyu", "rkyu", "rmyi", "sbre",
    "sbru", "sbyi", "sgre", "sgri", "sgro", "sgru", "sgye",
    "sgyo", "sgyu", "skre", "skri", "skru", "skye", "skyi",
    "skyo", "skyu", "smre", "smri", "smye", "smyi", "smyo",
    "smyu", "spre", "spri", "spro", "spru", "spyi", "spyo"
];

var sin_sub = [
    "bla", "bra", "bya", "dra", "dwa", "gla", "gra", "gwa", "gya",
    "hra", "hwa", "hya", "kla", "kra", "kwa", "kya", "lwa", "mra",
    "mya", "pra", "pya", "rla", "rwa", "sla", "sra", "tra", "zla",
    "zwa", "phya"
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
    // , "g.yi", "g.yo", "g.yu"
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

var supr = [
    "lba", "lca", "lda", "lga", "lha", "lka", "lnga",
    "lpa", "lta", "rba", "rda", "rdza", "rga", "rja",
    "rka", "rma", "rna", "rnga", "rta", "rtsa", "sba",
    "sda", "sga", "ska", "sma", "sna", "snga", "spa",
    "sta"
];

var supr_vow = [
    "lbe", "lbi", "lbu", "lce", "lci", "lco", "lcu",
    "lde", "ldi", "ldo", "ldu", "lgo", "lhe", "lho",
    "lhu", "lji", "lko", "lku", "lnge", "lngi", "lte",
    "lti", "lto", "rbe", "rbo", "rbu", "rde", "rdi",
    "rdo", "rdu", "rdze", "rdzi", "rdzo", "rdzu", "rge",
    "rgo", "rgu", "rje", "rji", "rjo", "rju", "rke",
    "rko", "rku", "rme", "rmi", "rmo", "rmu", "rnge",
    "rngo", "rngu", "rni", "rno", "rte", "rti", "rto",
    "rtse", "rtsi", "rtso", "sbe", "sbi", "sbo", "sbu",
    "sde", "sdi", "sdo", "sdu", "sge", "sgi", "sgo",
    "sgu", "snge", "sngo",
];

var sub_vow = [
    "ble", "bli", "blo", "blu", "bre", "bri", "bro",
    "bru", "bye", "byi", "byo", "byu", "dre", "dri",
    "dro", "dru", "gle", "gli", "glo", "glu", "gre",
    "gri", "gro", "gru", "gwo", "gye", "gyi", "gyo",
    "gyu", "hre", "hri", "hro", "hru", "hyi", "khre",
    "khri", "khro", "khru", "khye", "khyi", "khyo", "khyu",
    "kli", "klo", "klu", "kre", "kri", "kro", "kru",
    "kye", "kyi", "kyo", "kyu", "lwi", "lwo", "mre",
    "mri", "mro", "mye", "myi", "myo", "myu", "nri",
    "nro", "phri", "phro", "phru", "phye", "phyi", "phyo",
    "phyu", "pre", "pri", "pru", "pyi", "rlo", "rlu",
    "shwo", "sle", "sli", "slo", "slu", "sre", "sri",
    "sro", "sru", "tre", "tri", "tro", "tru", "tswo", "zlo"
];

var r = reg.regex;

// k(a), g(a), ng(a), h(a), tsh(a), etc..
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

    it("Checks for false positives: has superscibed", function() {
        forEach(supr, expect, exp, false);
    });

    it("Checks for false positives: has supersribed and vowel", function() {
        forEach(supr_vow, expect, exp, false);
    });

    it("Checks for false positives: has subscript", function() {
        forEach(sin_sub, expect, exp, false);
    });

    it("Checks for false positives: has subscript and vowel ", function() {
        forEach(sub_vow, expect, exp, false);
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

    it("Checks for false positives: has superscibed", function() {
        forEach(supr, expect, exp, false);
    });

    it("Checks for false positives: has supersribed and vowel", function() {
        forEach(supr_vow, expect, exp, false);
    });

    it("Checks for false positives: has subscript", function() {
        forEach(sin_sub, expect, exp, false);
    });

    it("Checks for false positives: has subscript and vowel ", function() {
        forEach(sub_vow, expect, exp, false);
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

    xit("Checks for false positives: has suffix", function() {
        forEach(["brag", "gsar", "'las"], expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

    it("Checks for false positives: has superscibed", function() {
        forEach(supr, expect, exp, false);
    });

//TODO Add checks!
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
describe("Test prefix and common vowel modifier", function() {

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

    xit("Checks for false positives: has suffix", function() {
        forEach(["brag", "gsar", "'las"], expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

    it("Checks for false positives: has superscibed", function() {
        forEach(supr, expect, exp, false);
    });

    it("Checks for false positives: has supersribed and vowel", function() {
        forEach(supr_vow, expect, exp, false);
    });

    it("Checks for false positives: has subscript", function() {
        forEach(sin_sub, expect, exp, false);
    });

    it("Checks for false positives: has subscript and vowel ", function() {
        forEach(sub_vow, expect, exp, false);
    });

});

// lha, lta, rta, rka, snga, etc.
describe("Test superscribed syllable, no vowel.", function() {

    var singlevow = [];
    var exp = r.three_supr;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(supr, expect, exp, true);
    });

    it("Check false positive: prefix with vowel", function() {
        forEach(pre_vow, expect, exp, false);
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

    xit("Checks for false positives: has suffix", function() {
        forEach(["brag", "gsar", "'las"], expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

    it("Checks for false positives: has supersribed and vowel", function() {
        forEach(supr_vow, expect, exp, false);
    });

    it("Checks for false positives: has subscript", function() {
        forEach(sin_sub, expect, exp, false);
    });

    it("Checks for false positives: has subscript and vowel ", function() {
        forEach(sub_vow, expect, exp, false);
    });

});

// lho, ltu, rte, rku, sngo, etc.
describe("Test superscribed syllable with vowel.", function() {

    var singlevow = [];
    var exp = r.three_supr_vow;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(supr_vow, expect, exp, true);
    });

    it("Check false positive: superscribed and no vowel", function() {
        forEach(supr, expect, exp, false);
    });

    it("Check false positive: prefix with vowel", function() {
        forEach(pre_vow, expect, exp, false);
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

    xit("Checks for false positives: has suffix", function() {
        forEach(["brag", "gsar", "'las"], expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

    it("Checks for false positives: has subscript", function() {
        forEach(sin_sub, expect, exp, false);
    });

    it("Checks for false positives: has subscript and vowel ", function() {
        forEach(sub_vow, expect, exp, false);
    });

});

// bla, sla, gya
describe("Test subscribed syllable, no vowel.", function() {

    var singlevow = [];
    var exp = r.three_sub;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(sin_sub, expect, exp, true);
    });

    it("Checks for false positives: has subscript and vowel ", function() {
        forEach(sub_vow, expect, exp, false);
    });

    it("Check false positive: superscribed with vowel", function() {
        forEach(supr_vow, expect, exp, false);
    });

    it("Check false positive: superscribed and no vowel", function() {
        forEach(supr, expect, exp, false);
    });

    it("Check false positive: prefix with vowel", function() {
        forEach(pre_vow, expect, exp, false);
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

    xit("Checks for false positives: has suffix", function() {
        forEach(["brag", "gsar", "'las"], expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

});

// 
describe("Test subscribed syllable with vowel.", function() {

    var singlevow = [];
    var exp = r.three_sub_vow;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(sub_vow, expect, exp, true);
    });

    it("Check false positive: subscribed and no vowel", function() {
        forEach(sin_sub, expect, exp, false);
    });

    it("Check false positive: superscribed with vowel", function() {
        forEach(supr_vow, expect, exp, false);
    });

    it("Check false positive: superscribed and no vowel", function() {
        forEach(supr, expect, exp, false);
    });

    it("Check false positive: prefix with vowel", function() {
        forEach(pre_vow, expect, exp, false);
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

    xit("Checks for false positives: has suffix", function() {
        forEach(["brag", "gsar", "'las"], expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

});

// blo, slu, gyo, tshwa, etc
describe("Test super- and subscribed with no vowel.", function() {

    var singlevow = [];
    var exp = r.sup_sub;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(sup_sub, expect, exp, true);
    });

    it("Check false positive: subscribed and no vowel", function() {
        forEach(sin_sub, expect, exp, false);
    });

    it("Check false positive: superscribed with vowel", function() {
        forEach(supr_vow, expect, exp, false);
    });

    it("Check false positive: superscribed and no vowel", function() {
        forEach(supr, expect, exp, false);
    });

    it("Check false positive: prefix with vowel", function() {
        forEach(pre_vow, expect, exp, false);
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

    xit("Checks for false positives: has suffix", function() {
        forEach(["brag", "gsar", "'las"], expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

});

// blo, slu, gyo, tshwo, etc
describe("Test super- and subscribed with vowel.", function() {

    var singlevow = [];
    var exp = r.sup_sub_vow;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(sup_sub_vow, expect, exp, true);
    });

    it("Check false positive: super, sub and no vowel", function() {
        forEach(sup_sub, expect, exp, false);
    });

    it("Check false positive: subscribed and no vowel", function() {
        forEach(sin_sub, expect, exp, false);
    });

    it("Check false positive: superscribed with vowel", function() {
        forEach(supr_vow, expect, exp, false);
    });

    it("Check false positive: superscribed and no vowel", function() {
        forEach(supr, expect, exp, false);
    });

    it("Check false positive: prefix with vowel", function() {
        forEach(pre_vow, expect, exp, false);
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

    xit("Checks for false positives: has suffix", function() {
        forEach(["brag", "gsar", "'las"], expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

});

// byang, 'dad, etc
describe("Test prefix and suffix, no vowel.", function() {

    var singlevow = [];
    var exp = r.pre_suf;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(pre_suf, expect, exp, true);
    });

    it("Check false positive: super, sub with vowel", function() {
        forEach(sup_sub_vow, expect, exp, false);
    });

    it("Check false positive: super, sub and no vowel", function() {
        forEach(sup_sub, expect, exp, false);
    });

    it("Check false positive: subscribed and no vowel", function() {
        forEach(sin_sub, expect, exp, false);
    });

    it("Check false positive: superscribed with vowel", function() {
        forEach(supr_vow, expect, exp, false);
    });

    it("Check false positive: superscribed and no vowel", function() {
        forEach(supr, expect, exp, false);
    });

    it("Check false positive: prefix with vowel", function() {
        forEach(pre_vow, expect, exp, false);
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

    xit("Checks for false positives: has suffix", function() {
        forEach(["brag", "gsar", "'las"], expect, exp, false);
    });

    it("Checks for false positives: has suffix", function() {
        forEach(["reg", "ser", "khor", "zhir"], expect, exp, false);
    });

});
