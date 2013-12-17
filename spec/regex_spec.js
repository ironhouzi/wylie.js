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

var pre_supr_sub = [
    "brbya", "brgya", "brnya", "bshra", "bskra", "bskya", "gskya"
];

var supr_suf_vow = [
    "lcong", "lcung", "ldeng", "lding", "ldong", "ldung", "lheng",
    "lhing", "lhong", "lhung", "ljong", "lkung", "lteng", "ltong",
    "ltung", "rdeng", "rding", "rdong", "rdung", "rdzing", "rdzong",
    "rdzung", "rgong", "rjeng", "rjing", "rkeng", "rkong", "rming",
    "rmong", "rnying", "rnyong", "rteng", "rting", "rtseng", "rtsing",
    "rtsong", "rtung", "sbong", "sbung", "sdeng", "sding", "sdong",
    "sdung", "sgeng", "sgong", "sgung", "skeng", "skong", "skung",
    "smeng", "snong", "snyeng", "snying", "snyong", "snyung", "sping",
    "spong", "spung", "steng", "sting", "stong", "stung", "lbub",
    "lbur", "lceb", "lceg", "lces", "lcib", "lcid", "lcig",
    "lcim", "lcin", "lcog", "lcud", "lcug", "lcum", "lcus",
    "ldeb", "ldeg", "ldel", "ldem", "lden", "lder", "ldes",
    "ldib", "ldig", "ldil", "ldim", "ldir", "ldob", "ldod",
    "ldog", "ldom", "ldon", "ldud", "ldug", "ldum", "ldur",
    "ldus", "lges", "lgob", "lgun", "lheb", "lhem", "lhen",
    "lhes", "lhob", "lhod", "lhog", "lhon", "lhor", "lhos",
    "lhub", "lhud", "lhug", "lhun", "lhur", "lhus", "ljen",
    "ljib", "ljid", "ljig", "ljin", "ljob", "ljon", "ljur",
    "lkob", "lkog", "lkol", "lkug", "lngem", "lngog", "lngum",
    "lteb", "ltem", "ltes", "ltib", "ltig", "ltir", "ltob",
    "ltod", "ltog", "ltol", "ltor", "ltos", "ltug", "ltun",
    "rbod", "rbud", "rdeb", "rdeg", "rdel", "rden", "rdib",
    "rdig", "rdis", "rdob", "rdod", "rdog", "rdol", "rdom",
    "rdor", "rdos", "rdub", "rdug", "rdul", "rdum", "rdun",
    "rdur", "rdzes", "rdzig", "rdzim", "rdzis", "rdzob", "rdzod",
    "rdzog", "rdzor", "rdzos", "rdzub", "rdzun", "rdzus", "rgen",
    "rgod", "rgog", "rgol", "rgom", "rgon", "rgud", "rgum",
    "rgun", "rgur", "rje'", "rjed", "rjen", "rjer", "rjes",
    "rjib", "rjid", "rjig", "rjin", "rjob", "rjod", "rjon",
    "rjud", "rked", "rken", "rkod", "rkog", "rkol", "rkom",
    "rkon", "rkos", "rkub", "rkug", "rkum", "rkun", "rkur",
    "rkus", "rmed", "rmeg", "rmel", "rmen", "rmes", "rmig",
    "rmin", "rmis", "rmod", "rmog", "rmon", "rmos", "rmug",
    "rmun", "rmur", "rmus", "rnged", "rngen", "rnges", "rngob",
    "rngod", "rngog", "rngol", "rngom", "rngon", "rngos", "rngub",
    "rngud", "rngul", "rngum", "rngur", "rngus", "rnil", "rnog",
    "rnom", "rnon", "rnor", "rnul", "rnur", "rnyed", "rnyes",
    "rnyid", "rnyil", "rnyis", "rnyob", "rnyog", "rnyon", "rnyos",
    "rnyum", "rte'", "rtem", "rten", "rtib", "rtig", "rtir",
    "rtis", "rtob", "rtod", "rtog", "rtol", "rtom", "rton",
    "rtos", "rtsed", "rtseg", "rtsel", "rtsen", "rtser", "rtses",
    "rtsib", "rtsid", "rtsig", "rtsil", "rtsim", "rtsin", "rtsir",
    "rtsis", "rtsob", "rtsod", "rtsog", "rtsol", "rtsom", "rtson",
    "rtsor", "rtsub", "rtsun", "rtub", "rtug", "rtul", "rtun",
    "sbeb", "sbed", "sbeg", "sbel", "sben", "sbid", "sbig",
    "sbin", "sbir", "sbis", "sbob", "sbod", "sbog", "sbol",
    "sbom", "sbon", "sbor", "sbos", "sbub", "sbud", "sbug",
    "sbul", "sbun", "sbur", "sbus", "sdeb", "sded", "sdeg",
    "sdel", "sdem", "sder", "sdes", "sdib", "sdid", "sdig",
    "sdir", "sdob", "sdod", "sdog", "sdom", "sdon", "sdor",
    "sdos", "sdub", "sdud", "sdug", "sdul", "sdum", "sdun",
    "sdur", "sdus", "sged", "sgeg", "sger", "sges", "sgid",
    "sgig", "sgir", "sgob", "sgod", "sgog", "sgom", "sgon",
    "sgor", "sgos", "sgub", "sgud", "sgug", "sgul", "sgum",
    "sgur", "sked", "skeg", "skem", "sker", "skes", "skid",
    "skod", "skog", "skol", "skom", "skon", "skor", "skos",
    "skub", "skud", "skug", "skul", "skum", "skun", "skur",
    "skus", "smed", "smeg", "smel", "smen", "smes", "smig",
    "smin", "smis", "smob", "smod", "smon", "smos", "smug",
    "smus", "sned", "sneg", "snel", "snem", "sner", "snes",
    "sngig", "sngob", "sngod", "sngog", "sngol", "sngom", "sngon",
    "sngos", "sngug", "sngun", "sngur", "snid", "snob", "snod",
    "snog", "snol", "snom", "snon", "snor", "snos", "snub",
    "snud", "snum", "snun", "snur", "snyed", "snyeg", "snyel",
    "snyem", "snyen", "snyer", "snyes", "snyid", "snyig", "snyil",
    "snyim", "snyin", "snyob", "snyod", "snyog", "snyol", "snyom",
    "snyon", "snyor", "snyos", "snyug", "snyun", "sped", "speg",
    "spel", "spen", "sper", "spes", "spig", "spin", "spir",
    "spob", "spod", "spog", "spol", "spom", "spon", "spor",
    "spos", "spub", "spud", "spug", "spul", "spun", "spur",
    "spus", "steb", "steg", "stem", "sten", "ster", "stes",
    "stib", "stig", "stim", "stir", "stis", "stob", "stod",
    "stog", "stom", "ston", "stor", "stos", "stsel", "stsol",
    "stub", "stud", "stug", "stun",
];

var supr_suf = [
    "lbang", "lcang", "lchang", "ldang", "lgang", "lhang", "ljang",
    "lngang", "ltang", "rdang", "rdzang", "rgang", "rjang", "rkang",
    "rmang", "rnang", "rnyang", "rtang", "rtsang", "sbang", "sdang",
    "sgang", "skang", "smang", "snang", "sngang", "snyang", "spang",
    "stang", "lbab", "lbag", "lbal", "lcag", "lcam", "lcan",
    "lcar", "ldab", "ldad", "ldag", "ldal", "ldam", "ldan",
    "ldar", "ldas", "lgam", "lgar", "lgas", "lha'", "lhab",
    "lhad", "lhag", "lham", "lhan", "lhar", "lhas", "ljab",
    "ljag", "ljan", "ljar", "lkad", "lkag", "lkal", "lkam",
    "lkas", "lngan", "lngar", "lngas", "lpag", "ltab", "ltad",
    "ltag", "ltam", "ltan", "ltar", "ltas", "rbab", "rbad",
    "rbag", "rdab", "rdag", "rdal", "rdam", "rdar", "rdas",
    "rdzab", "rdzad", "rdzag", "rdzam", "rdzan", "rdzar", "rdzas",
    "rgab", "rgad", "rgag", "rgal", "rgan", "rgar", "rgas",
    "rjan", "rjas", "rkad", "rkag", "rkal", "rkam", "rkan",
    "rmad", "rmag", "rmal", "rmam", "rman", "rmar", "rmas",
    "rnab", "rnad", "rnag", "rnal", "rnam", "rnar", "rnas",
    "rngab", "rngad", "rngal", "rngam", "rngan", "rngas", "rnyab",
    "rnyad", "rnyan", "rnyas", "rtab", "rtad", "rtag", "rtal",
    "rtam", "rtan", "rtar", "rtas", "rtsab", "rtsad", "rtsag",
    "rtsal", "rtsam", "rtsan", "rtsar", "rtsas", "sbab", "sbad",
    "sbag", "sbal", "sbam", "sban", "sbar", "sbas", "sdad",
    "sdam", "sdan", "sdar", "sga'", "sgab", "sgag", "sgal",
    "sgam", "sgar", "skab", "skad", "skag", "skal", "skam",
    "skan", "skar", "skas", "smad", "smag", "smal", "sman",
    "smar", "smas", "sna'", "snab", "snad", "snag", "snal",
    "snam", "snan", "snar", "snas", "snga'", "sngab", "sngag",
    "sngal", "sngan", "sngar", "sngas", "snyab", "snyad", "snyag",
    "snyal", "snyam", "snyan", "snyas", "spab", "spad", "spag",
    "spal", "spam", "span", "spar", "spas", "stab", "stad",
    "stag", "stan", "star", "stsad", "stsal",
];

var pre_supr = [
    "'rba", "'rga", "blda", "blta", "brda", "brga", "brnga",
    "brnya", "brta", "bska", "bsta", "grba",
];

var pre_supr_vow = [
    "'rdo", "blde", "blgo", "brdo", "brdze", "brdzi", "brdzu",
    "brje", "brji", "brjo", "brko", "brku", "brngo", "brnu",
    "brte", "brtse", "brtsi", "brtsu", "bsdi", "bsdo", "bsdu",
    "bsgo", "bsko", "bsku", "bsngo", "bsngu", "bsno", "bsnye",
    "bsnyo", "bspu", "bsti", "bstsi", "bstu", "drgu",
];

var suff2_vow = [
    "bebs", "bems", "bobs", "bogs", "bubs", "bugs", "chegs",
    "chems", "chibs", "chigs", "chims", "chobs", "chogs", "choms",
    "chugs", "chums", "debs", "dims", "dogs", "doms", "dubs",
    "dugs", "dzoms", "gebs", "gegs", "gems", "gigs", "gogs",
    "goms", "gugs", "jigs", "jugs", "khebs", "khegs", "khobs",
    "khogs", "khoms", "khugs", "khums", "kims", "kums", "legs",
    "lobs", "logs", "lugs", "lums", "migs", "mobs", "mugs",
    "negs", "nems", "ngogs", "ngoms", "nobs", "nogs", "noms",
    "nyigs", "nyogs", "nyoms", "nyugs", "phebs", "phibs", "phigs",
    "phobs", "phogs", "phubs", "phugs", "pibs", "regs", "rems",
    "rigs", "rims", "rogs", "rubs", "rugs", "rums", "sebs",
    "segs", "sems", "shibs", "shigs", "shobs", "shogs", "shoms",
    "shubs", "shugs", "shums", "sigs", "sims", "sobs", "sogs",
    "soms", "subs", "sugs", "sums", "thebs", "thegs", "thems",
    "thibs", "thigs", "thims", "thobs", "thogs", "thoms", "thubs",
    "thugs", "thums", "togs", "tsegs", "tsigs", "tsogs", "tsoms",
    "tsubs", "tsugs", "yegs", "yibs", "yogs", "yugs", "zebs",
    "zegs", "zhigs", "zhogs", "zhugs", "zhums", "zigs", "zugs"
];

var suff2 = [
    "babs", "bags", "band", "chags", "chams", "dabs", "dags",
    "dams", "dzabs", "dzags", "gags", "gams", "jabs", "jags",
    "jams", "khams", "pags", "phags", "thabs", "thags", "thams",
    "shabs", "shags", "shams", "hags", "babs", "bags", "dzabs",
    "ngabs", "ngams", "nyabs", "tsags", "tsams", "shags", "shams",
    "ngags", "ngams", "tsags", "tsabs", "tsags", "tsams", "zhabs",
    "zhags", "zhams", "chabs", "chags", "chams", "dags", "dams",
    "ngags", "dzags", "yabs", "gags", "nyags", "shags", "shams",
    "tsags", "zhabs", "zhags", "hags", "jags", "kams", "khabs",
    "khams", "labs", "lags", "lams", "ngags", "mand", "chams",
    "khams", "thams", "shags", "shams", "nabs", "nags", "nams",
    "pags", "phabs", "phags", "phams", "rabs", "rags", "rams",
    "rand", "dzags", "ngabs", "ngams", "tsabs", "tsags", "tsams",
    "sags", "sams", "shabs", "shags", "shams", "ngabs", "ngags",
    "thabs", "thags", "thams", "tsabs", "tsags", "tsams", "shabs",
    "shags", "shams", "wags", "yags", "yams", "zabs", "zags",
    "zand", "zhabs", "zhags", "zhams"
];

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

var pre_suf_vow = [
    "'beb", "'bed", "'beg", "'bel", "'bem", "'ben", "'ber",
    "'bib", "'big", "'bil", "'bir", "'bob", "'bod", "'bog",
    "'bol", "'bom", "'bor", "'bos", "'bub", "'bud", "'bug",
    "'bul", "'bum", "'bun", "'bur", "'bus", "'deb", "'ded",
    "'deg", "'del", "'dem", "'der", "'des", "'did", "'dig",
    "'din", "'dir", "'dis", "'dob", "'dod", "'dog", "'dol",
    "'dom", "'don", "'dor", "'dos", "'dub", "'dud", "'dug",
    "'dul", "'dum", "'dun", "'dur", "'dus", "'geb", "'ged",
    "'geg", "'gel", "'gem", "'gen", "'ges", "'god", "'gog",
    "'gol", "'gom", "'gor", "'gos", "'gud", "'gug", "'gul",
    "'gum", "'gun", "'gur", "'gus", "'jeb", "'jeg", "'jem",
    "'jen", "'jer", "'jes", "'jib", "'jig", "'jil", "'jim",
    "'jin", "'jir", "'jo'", "'job", "'jod", "'jog", "'jol",
    "'jom", "'jon", "'jor", "'jos", "'jud", "'jug", "'jum",
    "'jun", "'jur", "'jus", "'kor", "'kun", "'kur", "'pel",
    "'pen", "'pul", "'tog", "'zig", "'zin", "'zon", "'zug",
    "'zur", "bcem", "bcer", "bces", "bcib", "bcig", "bcil",
    "bcin", "bcir", "bcod", "bcog", "bcol", "bcom", "bcon",
    "bcos", "bcud", "bcug", "bcum", "bcun", "bcur", "bcus",
    "bdeg", "bden", "bder", "bdes", "bdod", "bdog", "bdol",
    "bdom", "bdor", "bdub", "bdud", "bdug", "bdun", "bdur",
    "bdus", "bgel", "bges", "bgod", "bgol", "bgom", "bgon",
    "bgor", "bgos", "bhir", "bjed", "bjod", "bkob", "bkod",
    "bkog", "bkol", "bkon", "bkor", "bkud", "bkug", "bkul",
    "bkum", "bkur", "bkus", "bmed", "bseb", "bsed", "bsel",
    "bsen", "bser", "bses", "bsid", "bsig", "bsil", "bsin",
    "bsir", "bsod", "bsog", "bsol", "bsom", "bsor", "bsos",
    "bsub", "bsud", "bsug", "bsum", "bsun", "bsur", "bsus",
    "bteg", "bter", "btib", "btig", "btod", "btog", "bton",
    "btor", "btub", "btud", "btug", "btul", "btum", "btun",
    "btus", "bzeb", "bzed", "bzem", "bzer", "bzes", "bzil",
    "bzim", "bzin", "bzob", "bzod", "bzog", "bzom", "bzor",
    "bzos", "bzul", "bzum", "bzun", "bzur", "dbed", "dbem",
    "dben", "dber", "dbig", "dbod", "dbog", "dbol", "dbon",
    "dbor", "dbos", "dbub", "dbud", "dbug", "dbul", "dbum",
    "dbur", "dbus", "dge'", "dgen", "dger", "dges", "dgod",
    "dgog", "dgol", "dgom", "dgon", "dgos", "dgug", "dgum",
    "dgun", "dgur", "dgus", "dkel", "dkod", "dkog", "dkol",
    "dkon", "dkor", "dkos", "dkug", "dkur", "dmig", "dmod",
    "dmug", "dmul", "dmun", "dmur", "dmus", "dpen", "dper",
    "dpes", "dpod", "dpog", "dpon", "dpor", "dpul", "dpun",
    "dpur", "dpus", "dtub", "gbul", "gcem", "gcen", "gcer",
    "gces", "gcid", "gcig", "gcil", "gcin", "gcir", "gcis",
    "gcod", "gcog", "gcol", "gcom", "gcor", "gcos", "gcud",
    "gcug", "gcun", "gcur", "gcus", "gdeg", "gdim", "gdod",
    "gdog", "gdol", "gdon", "gdos", "gdub", "gdud", "gdug",
    "gdul", "gdum", "gdun", "gdus", "gher", "ghir", "ghur",
    "gkod", "gkol", "gkun", "gkur", "gmig", "gmos", "gner",
    "gnid", "gnob", "gnod", "gnog", "gnon", "gnor", "gnub",
    "gseb", "gsed", "gseg", "gsel", "gsen", "gser", "gses",
    "gsid", "gsig", "gsil", "gsin", "gsir", "gsob", "gsod",
    "gsog", "gsol", "gsom", "gson", "gsor", "gsos", "gsub",
    "gsud", "gsug", "gsum", "gsun", "gsur", "gsus", "gted",
    "gteg", "gtel", "gtem", "gter", "gtib", "gtig", "gtim",
    "gtir", "gtod", "gtog", "gtol", "gtom", "gton", "gtor",
    "gtos", "gtub", "gtud", "gtug", "gtul", "gtum", "gtun",
    "gtur", "gzeb", "gzed", "gzeg", "gzem", "gzen", "gzer",
    "gzig", "gzil", "gzim", "gzir", "gzob", "gzod", "gzog",
    "gzol", "gzon", "gzos", "gzud", "gzug", "gzul", "gzum",
    "gzur", "mcis", "mcod", "mdel", "mdil", "mdod", "mdog",
    "mdom", "mdon", "mdor", "mdos", "mdud", "mdun", "mdur",
    "mgom", "mgon", "mgor", "mgos", "mgug", "mgul", "mgur",
    "mgus", "mjed", "mjes", "mjin", "mjol", "mjor", "mjos",
    "mjug", "mkul", "mmos", "mnod", "mnog", "mnol", "mnon",
    "mnor", "mnos", "mnun", "msug", "mzed", "mzes", "mzin",
    "mzod"
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

// byong, 'did, etc
describe("Test prefix suffix and vowel.", function() {

    var singlevow = [];
    var exp = r.pre_suf_vow;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(pre_suf_vow, expect, exp, true);
    });

    it("Check false positive: pre-/suffix and no vowel", function() {
        forEach(pre_suf, expect, exp, false);
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

// babs, etc
describe("Test Suffix, 2nd suffix with no vowel.", function() {

    var singlevow = [];
    var exp = r.suff2;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(suff2, expect, exp, true);
    });

    it("Check false positive: pre-/suffix with vowel", function() {
        forEach(pre_suf_vow, expect, exp, false);
    });

    it("Check false positive: pre-/suffix and no vowel", function() {
        forEach(pre_suf, expect, exp, false);
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

// bibs, etc
describe("Test Suffix, 2nd suffix with vowel modifier.", function() {

    var singlevow = [];
    var exp = r.suff2_vow;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(suff2_vow, expect, exp, true);
    });

    it("Check false positive: 2nd suffix and no vowel", function() {
        forEach(suff2, expect, exp, false);
    });

    it("Check false positive: pre-/suffix with vowel", function() {
        forEach(pre_suf_vow, expect, exp, false);
    });

    it("Check false positive: pre-/suffix and no vowel", function() {
        forEach(pre_suf, expect, exp, false);
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

// 'bra, etc
describe("Test Prefix with superscribed with no vowel.", function() {

    var singlevow = [];
    var exp = r.pre_supr;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(pre_supr, expect, exp, true);
    });

    it("Check false positive: 2nd suffix with vowel", function() {
        forEach(suff2_vow, expect, exp, false);
    });

    it("Check false positive: 2nd suffix and no vowel", function() {
        forEach(suff2, expect, exp, false);
    });

    it("Check false positive: pre-/suffix with vowel", function() {
        forEach(pre_suf_vow, expect, exp, false);
    });

    it("Check false positive: pre-/suffix and no vowel", function() {
        forEach(pre_suf, expect, exp, false);
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

// 'rgo, etc
describe("Test Prefix with superscribed with no vowel.", function() {

    var singlevow = [];
    var exp = r.pre_supr_vow;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(pre_supr_vow, expect, exp, true);
    });

    it("Check false positive: prefix superscribed, no wovel", function() {
        forEach(pre_supr, expect, exp, false);
    });

    it("Check false positive: 2nd suffix with vowel", function() {
        forEach(suff2_vow, expect, exp, false);
    });

    it("Check false positive: 2nd suffix and no vowel", function() {
        forEach(suff2, expect, exp, false);
    });

    it("Check false positive: pre-/suffix with vowel", function() {
        forEach(pre_suf_vow, expect, exp, false);
    });

    it("Check false positive: pre-/suffix and no vowel", function() {
        forEach(pre_suf, expect, exp, false);
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

// rbab, etc
describe("Test superscibed with suffix and no vowel.", function() {

    var singlevow = [];
    var exp = r.supr_suf;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(supr_suf, expect, exp, true);
    });

    it("Check false positive: prefix, superscribed and vowel", function() {
        forEach(pre_supr_vow, expect, exp, false);
    });

    it("Check false positive: prefix superscribed, no wovel", function() {
        forEach(pre_supr, expect, exp, false);
    });

    it("Check false positive: 2nd suffix with vowel", function() {
        forEach(suff2_vow, expect, exp, false);
    });

    it("Check false positive: 2nd suffix and no vowel", function() {
        forEach(suff2, expect, exp, false);
    });

    it("Check false positive: pre-/suffix with vowel", function() {
        forEach(pre_suf_vow, expect, exp, false);
    });

    it("Check false positive: pre-/suffix and no vowel", function() {
        forEach(pre_suf, expect, exp, false);
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

// rbob, etc
describe("Test superscibed with suffix and vowel.", function() {

    var singlevow = [];
    var exp = r.supr_suf_vow;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(supr_suf_vow, expect, exp, true);
    });

    it("Check false positive: superscribed, suffix no vowel", function() {
        forEach(supr_suf, expect, exp, false);
    });

    it("Check false positive: prefix, superscribed and vowel", function() {
        forEach(pre_supr_vow, expect, exp, false);
    });

    it("Check false positive: prefix superscribed, no wovel", function() {
        forEach(pre_supr, expect, exp, false);
    });

    it("Check false positive: 2nd suffix with vowel", function() {
        forEach(suff2_vow, expect, exp, false);
    });

    it("Check false positive: 2nd suffix and no vowel", function() {
        forEach(suff2, expect, exp, false);
    });

    it("Check false positive: pre-/suffix with vowel", function() {
        forEach(pre_suf_vow, expect, exp, false);
    });

    it("Check false positive: pre-/suffix and no vowel", function() {
        forEach(pre_suf, expect, exp, false);
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

// brya, etc
describe("Test prefix, super-/subscribed and no vowel.", function() {

    var singlevow = [];
    var exp = r.pre_supr_sub;

    beforeEach(function() {
        singlevow = addvow();
    });


    it("Standard", function() {
        forEach(pre_supr_sub, expect, exp, true);
    });

    it("Check false positive: superscribed, suffix with vowel", function() {
        forEach(supr_suf_vow, expect, exp, false);
    });

    it("Check false positive: superscribed, suffix no vowel", function() {
        forEach(supr_suf, expect, exp, false);
    });

    it("Check false positive: prefix, superscribed and vowel", function() {
        forEach(pre_supr_vow, expect, exp, false);
    });

    it("Check false positive: prefix superscribed, no wovel", function() {
        forEach(pre_supr, expect, exp, false);
    });

    it("Check false positive: 2nd suffix with vowel", function() {
        forEach(suff2_vow, expect, exp, false);
    });

    it("Check false positive: 2nd suffix and no vowel", function() {
        forEach(suff2, expect, exp, false);
    });

    it("Check false positive: pre-/suffix with vowel", function() {
        forEach(pre_suf_vow, expect, exp, false);
    });

    it("Check false positive: pre-/suffix and no vowel", function() {
        forEach(pre_suf, expect, exp, false);
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
