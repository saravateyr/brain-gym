'use strict';
// Language puzzles: English (scholarship Paper 1, first language for English medium)
// and Marathi (Paper 2, third language). All content comes from hand-written banks below.
// Bank rows: [level, prompt, answer, [wrong options], note?]

const atLevel = (bank, level) => {
  const pool = bank.filter(r => r[0] === level);
  return pool.length >= 6 ? pool : bank.filter(r => Math.abs(r[0] - level) <= 1);
};

// ================================================================ ENGLISH

const EN_OPP = [
  [1, 'big', 'small', ['large', 'huge', 'giant']], [1, 'hot', 'cold', ['warm', 'boiling', 'sunny']],
  [1, 'happy', 'sad', ['glad', 'joyful', 'merry']], [1, 'fast', 'slow', ['quick', 'rapid', 'speedy']],
  [1, 'day', 'night', ['morning', 'noon', 'sun']], [1, 'up', 'down', ['above', 'high', 'top']],
  [1, 'open', 'shut', ['start', 'begin', 'wide']], [1, 'tall', 'short', ['high', 'long', 'big']],
  [1, 'rich', 'poor', ['wealthy', 'costly', 'golden']], [1, 'clean', 'dirty', ['neat', 'tidy', 'washed']],
  [1, 'full', 'empty', ['filled', 'complete', 'whole']], [1, 'win', 'lose', ['gain', 'beat', 'succeed']],
  [1, 'early', 'late', ['soon', 'first', 'quick']], [1, 'strong', 'weak', ['powerful', 'mighty', 'tough']],
  [1, 'thick', 'thin', ['dense', 'wide', 'deep']], [1, 'new', 'old', ['fresh', 'latest', 'modern']],
  [2, 'brave', 'cowardly', ['bold', 'fearless', 'daring']], [2, 'give', 'take', ['donate', 'offer', 'gift']],
  [2, 'inside', 'outside', ['within', 'indoor', 'inner']], [2, 'buy', 'sell', ['purchase', 'pay', 'shop']],
  [2, 'push', 'pull', ['press', 'shove', 'move']], [2, 'friend', 'enemy', ['pal', 'buddy', 'mate']],
  [2, 'laugh', 'cry', ['smile', 'giggle', 'grin']], [2, 'remember', 'forget', ['recall', 'recollect', 'remind']],
  [2, 'question', 'answer', ['ask', 'query', 'doubt']], [2, 'entrance', 'exit', ['entry', 'door', 'gate']],
  [2, 'true', 'false', ['right', 'correct', 'real']], [2, 'before', 'after', ['earlier', 'first', 'ahead']],
  [2, 'loud', 'quiet', ['noisy', 'booming', 'shouting']], [2, 'arrive', 'depart', ['reach', 'come', 'land']],
  [2, 'asleep', 'awake', ['sleeping', 'dreaming', 'resting']], [2, 'accept', 'reject', ['take', 'receive', 'agree']],
  [3, 'ancient', 'modern', ['old', 'antique', 'aged']], [3, 'victory', 'defeat', ['win', 'success', 'triumph']],
  [3, 'increase', 'decrease', ['raise', 'grow', 'add']], [3, 'generous', 'selfish', ['kind', 'giving', 'helpful']],
  [3, 'polite', 'rude', ['kind', 'gentle', 'courteous']], [3, 'permanent', 'temporary', ['lasting', 'fixed', 'stable']],
  [3, 'maximum', 'minimum', ['most', 'highest', 'greatest']], [3, 'import', 'export', ['bring in', 'buy', 'enter']],
  [3, 'expand', 'shrink', ['grow', 'spread', 'swell']], [3, 'honest', 'dishonest', ['truthful', 'sincere', 'fair']],
  [3, 'possible', 'impossible', ['likely', 'able', 'easy']], [3, 'visible', 'invisible', ['seen', 'clear', 'bright']],
  [3, 'interesting', 'boring', ['exciting', 'amusing', 'thrilling']], [3, 'careful', 'careless', ['cautious', 'alert', 'watchful']],
  [3, 'praise', 'blame', ['admire', 'applaud', 'cheer']], [3, 'include', 'exclude', ['contain', 'add', 'involve']],
];

const EN_SYN = [
  [1, 'big', 'large', ['small', 'tiny', 'short']], [1, 'happy', 'glad', ['sad', 'angry', 'tired']],
  [1, 'fast', 'quick', ['slow', 'late', 'lazy']], [1, 'begin', 'start', ['end', 'stop', 'finish']],
  [1, 'small', 'little', ['big', 'huge', 'tall']], [1, 'shut', 'close', ['open', 'wide', 'show']],
  [1, 'gift', 'present', ['bill', 'loss', 'letter']], [1, 'speak', 'talk', ['listen', 'hear', 'write']],
  [1, 'hurry', 'rush', ['wait', 'stay', 'rest']], [1, 'pretty', 'beautiful', ['ugly', 'plain', 'dull']],
  [1, 'sick', 'ill', ['healthy', 'fit', 'well']], [1, 'shout', 'yell', ['whisper', 'mumble', 'hum']],
  [2, 'brave', 'courageous', ['fearful', 'timid', 'weak']], [2, 'angry', 'furious', ['calm', 'cheerful', 'polite']],
  [2, 'smart', 'clever', ['foolish', 'silly', 'dull']], [2, 'difficult', 'hard', ['easy', 'simple', 'light']],
  [2, 'help', 'assist', ['harm', 'hurt', 'stop']], [2, 'end', 'finish', ['start', 'begin', 'open']],
  [2, 'rich', 'wealthy', ['poor', 'needy', 'cheap']], [2, 'quiet', 'silent', ['noisy', 'loud', 'busy']],
  [2, 'afraid', 'scared', ['brave', 'bold', 'calm']], [2, 'stone', 'rock', ['sand', 'wood', 'leaf']],
  [2, 'correct', 'right', ['wrong', 'false', 'left']], [2, 'tired', 'weary', ['fresh', 'active', 'lively']],
  [3, 'enormous', 'huge', ['tiny', 'narrow', 'short']], [3, 'ancient', 'old', ['new', 'modern', 'fresh']],
  [3, 'purchase', 'buy', ['sell', 'lend', 'borrow']], [3, 'gloomy', 'sad', ['cheerful', 'bright', 'lively']],
  [3, 'weep', 'cry', ['laugh', 'smile', 'grin']], [3, 'journey', 'trip', ['home', 'rest', 'halt']],
  [3, 'fortunate', 'lucky', ['unlucky', 'poor', 'sad']], [3, 'damage', 'harm', ['repair', 'mend', 'fix']],
  [3, 'reply', 'answer', ['question', 'ask', 'query']], [3, 'assemble', 'gather', ['scatter', 'separate', 'divide']],
  [3, 'vanish', 'disappear', ['appear', 'arrive', 'show']], [3, 'famous', 'well-known', ['unknown', 'hidden', 'ordinary']],
];

const EN_SPELL = [
  [1, 'friend', ['frend', 'freind', 'frind']], [1, 'school', ['scool', 'skool', 'schol']],
  [1, 'beautiful', ['beautifull', 'beutiful', 'beautyful']], [1, 'because', ['becaus', 'becouse', 'bicause']],
  [1, 'colour', ['colur', 'coloar', 'culour']], [1, 'water', ['watar', 'wotar', 'watter']],
  [1, 'flower', ['flowar', 'flouer', 'flawer']], [1, 'teacher', ['teachar', 'techer', 'teecher']],
  [1, 'family', ['famly', 'familly', 'femily']], [1, 'garden', ['gardan', 'gardin', 'gerden']],
  [1, 'window', ['windo', 'windoe', 'windaw']], [1, 'yellow', ['yelow', 'yallow', 'yellou']],
  [2, 'tomorrow', ['tommorow', 'tomorow', 'tommorrow']], [2, 'library', ['libary', 'liberary', 'librery']],
  [2, 'February', ['Febuary', 'Febrary', 'Feburary']], [2, 'Wednesday', ['Wensday', 'Wednesdey', 'Wedensday']],
  [2, 'minute', ['minit', 'minnute', 'menute']], [2, 'island', ['iland', 'islend', 'ieland']],
  [2, 'knowledge', ['knowlege', 'nowledge', 'knowledg']], [2, 'answer', ['anser', 'answar', 'ansewer']],
  [2, 'neighbour', ['naibour', 'neighbur', 'nieghbour']], [2, 'vegetable', ['vegitable', 'vegetabel', 'vejetable']],
  [2, 'elephant', ['elefant', 'elephent', 'eliphant']], [2, 'calendar', ['calender', 'calandar', 'celendar']],
  [3, 'necessary', ['neccessary', 'necesary', 'neccesary']], [3, 'separate', ['seperate', 'separete', 'seprate']],
  [3, 'government', ['goverment', 'governmant', 'govenment']], [3, 'beginning', ['begining', 'beginnig', 'beggining']],
  [3, 'environment', ['enviroment', 'envirnment', 'environmant']], [3, 'restaurant', ['resturant', 'restaurent', 'restraunt']],
  [3, 'achievement', ['acheivement', 'achievment', 'achievemant']], [3, 'believe', ['beleive', 'belive', 'beleve']],
  [3, 'receive', ['recieve', 'receve', 'riceive']], [3, 'disappear', ['dissapear', 'disapear', 'dissappear']],
  [3, 'occasion', ['ocassion', 'occassion', 'ocasion']], [3, 'different', ['diffrent', 'differant', 'difrent']],
];

registerGen({
  id: 'en_opp', section: 'eng', icon: '↔️', title: 'Opposites',
  desc: 'Find the word with the opposite meaning (antonyms).',
  gen(level) {
    const [, w, a, wrong] = U.pick(atLevel(EN_OPP, level));
    return U.mcq({
      q: `Choose the word <b>opposite</b> in meaning to <b>${w.toUpperCase()}</b>.`, correct: a, wrong,
      hint: 'Opposite = reverse meaning (hot ↔ cold). Careful: some options mean the SAME thing!',
      explain: `<b>${w}</b> ↔ <b>${a}</b>.<br>${wrong.join(', ')} have a similar meaning to ${w}, not the opposite.`,
    });
  },
});

registerGen({
  id: 'en_syn', section: 'eng', icon: '🤝', title: 'Same Meaning',
  desc: 'Find the word with the same meaning (synonyms).',
  gen(level) {
    const [, w, a, wrong] = U.pick(atLevel(EN_SYN, level));
    return U.mcq({
      q: `Choose the word that has the <b>same meaning</b> as <b>${w.toUpperCase()}</b>.`, correct: a, wrong,
      hint: 'Same meaning (big = large). Careful: some options are opposites!',
      explain: `<b>${w}</b> = <b>${a}</b>. You can use one in place of the other in a sentence.`,
    });
  },
});

registerGen({
  id: 'en_spell', section: 'eng', icon: '🐝', title: 'Spelling',
  desc: 'Spot the correct spelling or the missing letter.',
  gen(level) {
    const [, w, wrong] = U.pick(atLevel(EN_SPELL, level));
    if (level < 3 && w.length >= 6 && Math.random() < 0.45) {
      const idx = U.shuffle(U.range(w.length - 1).map(i => i + 1)).find(i => 'aeiou'.includes(w[i]));
      if (idx !== undefined) {
        const gap = w.slice(0, idx) + '_' + w.slice(idx + 1);
        return U.mcq({
          q: `Which letter is missing? <b class="spaced">${gap}</b>`, correct: w[idx], wrong: 'aeiou'.split('').filter(v => v !== w[idx]),
          hint: 'Say the word slowly and listen to each sound.',
          explain: `The word is <b>${w}</b>, so the missing letter is <b>${w[idx]}</b>.`,
        });
      }
    }
    return U.mcq({
      q: 'Which word is spelt <b>correctly</b>?', correct: w, wrong,
      hint: 'Look at each word carefully, letter by letter. Which one looks like the word in your book?',
      explain: `The correct spelling is <b>${w}</b>.`,
    });
  },
});

// ---------------------------------------------------------------- Grammar
const EN_PLURAL = [
  [1, 'box', 'boxes', ['boxs', 'boxies', 'boxen']], [1, 'baby', 'babies', ['babys', 'babyes', 'babyies']],
  [1, 'bus', 'buses', ['buss', 'busies', 'busen']], [1, 'city', 'cities', ['citys', 'cityes', 'citties']],
  [1, 'man', 'men', ['mans', 'mens', 'manes']], [1, 'woman', 'women', ['womans', 'womens', 'womanes']],
  [1, 'dish', 'dishes', ['dishs', 'dishies', 'dishess']], [1, 'lady', 'ladies', ['ladys', 'ladyes', 'ladis']],
  [2, 'child', 'children', ['childs', 'childrens', 'childes']], [2, 'tooth', 'teeth', ['tooths', 'teeths', 'toothes']],
  [2, 'foot', 'feet', ['foots', 'feets', 'footes']], [2, 'mouse', 'mice', ['mouses', 'mices', 'mousies']],
  [2, 'knife', 'knives', ['knifs', 'knivs', 'knifies']], [2, 'leaf', 'leaves', ['leafs', 'leafes', 'leavs']],
  [2, 'tomato', 'tomatoes', ['tomatos', 'tomatoies', 'tomatoe']], [2, 'goose', 'geese', ['gooses', 'geeses', 'goosen']],
  [3, 'sheep', 'sheep', ['sheeps', 'sheepes', 'shoop']], [3, 'deer', 'deer', ['deers', 'deeres', 'deeren']],
  [3, 'ox', 'oxen', ['oxes', 'oxs', 'oxens']], [3, 'wolf', 'wolves', ['wolfs', 'wolfes', 'wolvs']],
  [3, 'potato', 'potatoes', ['potatos', 'potatoies', 'potatoe']], [3, 'story', 'stories', ['storys', 'storyes', 'storyies']],
  [3, 'half', 'halves', ['halfs', 'halfes', 'halvs']], [3, 'louse', 'lice', ['louses', 'lices', 'licen']],
];
const EN_GENDER = [
  [1, 'king', 'queen'], [1, 'boy', 'girl'], [1, 'father', 'mother'], [1, 'brother', 'sister'],
  [1, 'uncle', 'aunt'], [1, 'son', 'daughter'], [1, 'husband', 'wife'], [1, 'man', 'woman'],
  [2, 'lion', 'lioness'], [2, 'tiger', 'tigress'], [2, 'prince', 'princess'], [2, 'actor', 'actress'],
  [2, 'nephew', 'niece'], [2, 'grandfather', 'grandmother'], [2, 'hero', 'heroine'], [2, 'host', 'hostess'],
  [3, 'horse', 'mare'], [3, 'cock', 'hen'], [3, 'bull', 'cow'], [3, 'monk', 'nun'],
  [3, 'gentleman', 'lady'], [3, 'emperor', 'empress'], [3, 'landlord', 'landlady'], [3, 'drake', 'duck'],
];
const EN_PAST = [
  [1, 'go', 'went', ['goed', 'gone', 'going']], [1, 'eat', 'ate', ['eated', 'eaten', 'eating']],
  [1, 'run', 'ran', ['runned', 'running', 'runs']], [1, 'see', 'saw', ['seed', 'seen', 'seeing']],
  [1, 'sit', 'sat', ['sitted', 'seat', 'sitting']], [1, 'come', 'came', ['comed', 'coming', 'comes']],
  [1, 'sing', 'sang', ['singed', 'sung', 'singing']], [1, 'drink', 'drank', ['drinked', 'drunk', 'drinking']],
  [2, 'write', 'wrote', ['writed', 'written', 'writing']], [2, 'take', 'took', ['taked', 'taken', 'taking']],
  [2, 'buy', 'bought', ['buyed', 'brought', 'buying']], [2, 'bring', 'brought', ['bringed', 'bought', 'brang']],
  [2, 'fly', 'flew', ['flied', 'flown', 'flying']], [2, 'swim', 'swam', ['swimmed', 'swum', 'swimming']],
  [2, 'speak', 'spoke', ['speaked', 'spoken', 'speaking']], [2, 'draw', 'drew', ['drawed', 'drawn', 'drawing']],
  [3, 'catch', 'caught', ['catched', 'cought', 'catching']], [3, 'teach', 'taught', ['teached', 'tought', 'teaching']],
  [3, 'think', 'thought', ['thinked', 'thank', 'thinking']], [3, 'sleep', 'slept', ['sleeped', 'sleept', 'sleeping']],
  [3, 'begin', 'began', ['begun', 'beginned', 'begining']], [3, 'cut', 'cut', ['cutted', 'cuted', 'cutting']],
  [3, 'put', 'put', ['putted', 'puted', 'putting']], [3, 'tell', 'told', ['telled', 'tolled', 'telling']],
];
const EN_ARTICLE = [
  [1, 'an', 'apple'], [1, 'a', 'ball'], [1, 'an', 'egg'], [1, 'a', 'cat'], [1, 'an', 'orange'], [1, 'a', 'dog'],
  [1, 'an', 'umbrella'], [1, 'an', 'elephant'], [1, 'a', 'tree'], [1, 'an', 'ant'],
  [2, 'an', 'hour'], [2, 'an', 'honest man'], [2, 'a', 'horse'], [2, 'an', 'owl'], [2, 'an', 'ice cream'], [2, 'an', 'aeroplane'],
  [3, 'a', 'university'], [3, 'a', 'uniform'], [3, 'a', 'one-rupee coin'], [3, 'a', 'European'], [3, 'an', 'honour'], [3, 'a', 'unicorn'],
];
// [level, sentence with ___, answer, wrongs, why]
const EN_FILL = [
  [1, 'Riya ___ a good girl.', 'is', ['are', 'am', 'were'], 'Riya is one person → <b>is</b>.'],
  [1, 'They ___ playing in the park now.', 'are', ['is', 'am', 'was'], '"They" is plural and the action is happening now → <b>are</b>.'],
  [1, 'I ___ ten years old.', 'am', ['is', 'are', 'be'], 'We always say "I <b>am</b>".'],
  [1, '___ is my best friend.', 'She', ['Her', 'Them', 'Us'], 'Before the verb "is" we need a subject word like <b>She</b>.'],
  [1, 'This pencil belongs to me. It is ___.', 'mine', ['me', 'my', 'I'], '"It is <b>mine</b>" shows the pencil belongs to me.'],
  [1, 'Please give ___ a glass of water.', 'me', ['I', 'my', 'mine'], 'After "give" we use <b>me</b>.'],
  [1, 'The children ___ to school every day.', 'go', ['goes', 'going', 'gone'], '"Children" is plural → <b>go</b> (not goes).'],
  [1, 'My mother ___ tea every morning.', 'drinks', ['drink', 'drinking', 'drunk'], '"My mother" is one person → <b>drinks</b>.'],
  [1, 'There ___ five mangoes in the basket.', 'are', ['is', 'am', 'was'], 'Five mangoes are many → <b>are</b>.'],
  [2, 'She is good ___ drawing.', 'at', ['in', 'on', 'of'], 'We say "good <b>at</b>" something.'],
  [2, 'He is afraid ___ dogs.', 'of', ['from', 'with', 'by'], 'We say "afraid <b>of</b>".'],
  [2, 'We go to school ___ bus.', 'by', ['in', 'on', 'with'], 'For travel we say "<b>by</b> bus, by train, by car".'],
  [2, 'My birthday is ___ Monday.', 'on', ['in', 'at', 'by'], 'We use <b>on</b> with days: on Monday.'],
  [2, "The train arrives ___ 5 o'clock.", 'at', ['on', 'in', 'of'], 'We use <b>at</b> with clock time.'],
  [2, 'I was born ___ 2016.', 'in', ['on', 'at', 'of'], 'We use <b>in</b> with years and months.'],
  [2, 'Listen ___ your teacher.', 'to', ['at', 'for', 'by'], 'We say "listen <b>to</b>".'],
  [2, 'Yesterday we ___ to the zoo.', 'went', ['go', 'goes', 'going'], '"Yesterday" means the past → <b>went</b>.'],
  [2, 'Ravi and Sita ___ brother and sister.', 'are', ['is', 'am', 'has'], 'Two people → <b>are</b>.'],
  [2, 'The sun ___ in the east.', 'rises', ['rise', 'rising', 'risen'], 'A fact about one thing (the sun) → <b>rises</b>.'],
  [3, 'This is the ___ building in our town.', 'tallest', ['taller', 'tall', 'most tall'], 'Comparing with all buildings → <b>tallest</b>.'],
  [3, 'Ram is ___ than Shyam.', 'taller', ['tallest', 'tall', 'more tall'], 'Comparing two people with "than" → <b>taller</b>.'],
  [3, 'He has ___ his homework.', 'finished', ['finish', 'finishing', 'finishes'], 'After "has" we use the form <b>finished</b>.'],
  [3, 'She sings ___.', 'beautifully', ['beautiful', 'beauty', 'beautify'], 'It tells HOW she sings → <b>beautifully</b> (an adverb).'],
  [3, 'I have lived here ___ 2020.', 'since', ['for', 'at', 'on'], 'With a starting point in time we use <b>since</b>.'],
  [3, 'He divided the sweets ___ his two sons.', 'between', ['among', 'with', 'at'], 'For two people we use <b>between</b> (among is for more than two).'],
  [3, 'Each of the boys ___ a bag.', 'has', ['have', 'are', 'were'], '"Each" means every single one → <b>has</b>.'],
  [3, 'Which word is a <b>noun</b>?', 'school', ['happy', 'run', 'quickly'], 'A noun is a name of a person, place or thing → <b>school</b>.'],
  [3, 'Which word is a <b>verb</b>?', 'jump', ['beautiful', 'table', 'slowly'], 'A verb is an action word → <b>jump</b>.'],
  [3, 'Which word is an <b>adjective</b>?', 'brave', ['run', 'chair', 'slowly'], 'An adjective describes a noun → <b>brave</b> (a brave boy).'],
  [3, 'Which word is a <b>pronoun</b>?', 'they', ['the', 'then', 'there'], 'A pronoun is used in place of a noun → <b>they</b>.'],
];

registerGen({
  id: 'en_grammar', section: 'eng', icon: '📝', title: 'Grammar',
  desc: 'Plurals, gender, past tense, a/an and fill in the blanks.',
  gen(level) {
    const kind = U.pick(['plural', 'gender', 'past', 'article', 'fill', 'fill']);
    if (kind === 'plural') {
      const [, w, a, wrong] = U.pick(atLevel(EN_PLURAL, level));
      return U.mcq({ q: `What is the <b>plural</b> of <b>${w}</b>?`, correct: a, wrong,
        hint: 'Plural means more than one. Some words change completely (man → men).',
        explain: `One ${w}, many <b>${a}</b>.${w === a ? ' This word stays the same in the plural!' : ''}` });
    }
    if (kind === 'gender') {
      const pool = atLevel(EN_GENDER, level), [, m, f] = U.pick(pool);
      return U.mcq({ q: `What is the <b>feminine</b> (female) form of <b>${m}</b>?`, correct: f,
        // 'lady' and 'woman' are too close to each other to be used as wrong options for man/gentleman
        wrong: U.shuffle(EN_GENDER.filter(r => r[2] !== f && r[1] !== m && !(['lady', 'woman'].includes(f) && ['lady', 'woman'].includes(r[2])))).map(r => r[2]),
        hint: 'Feminine means the female word (boy → girl).', explain: `${m} → <b>${f}</b>.` });
    }
    if (kind === 'past') {
      const [, w, a, wrong] = U.pick(atLevel(EN_PAST, level));
      return U.mcq({ q: `What is the <b>past tense</b> of <b>${w}</b>?<br><small>Yesterday I ___.</small>`, correct: a, wrong,
        hint: 'Try it in a sentence: "Yesterday I ___."',
        explain: `Today I ${w}; yesterday I <b>${a}</b>.${w === a ? ' This verb does not change!' : ''}` });
    }
    if (kind === 'article') {
      const pool = atLevel(EN_ARTICLE, level), pick = U.sample(pool, 4);
      const flip = a => a === 'a' ? 'an' : 'a';
      const correct = `${pick[0][1]} ${pick[0][2]}`;
      return U.mcq({ q: 'Which one is <b>correct</b>?', correct, wrong: pick.slice(1).map(r => `${flip(r[1])} ${r[2]}`),
        hint: 'Use "an" before a vowel SOUND (a, e, i, o, u sounds). "Hour" starts with an "o" sound; "university" starts with a "y" sound.',
        explain: `<b>${correct}</b> is correct. ${pick.slice(1).map(r => `"${flip(r[1])} ${r[2]}" should be "${r[1]} ${r[2]}"`).join('; ')}.` });
    }
    const [, s, a, wrong, why] = U.pick(atLevel(EN_FILL, level));
    return U.mcq({ q: s.includes('___') ? `Fill in the blank: <b>${s}</b>` : s, correct: a, wrong,
      hint: 'Read the sentence with each option. Which one sounds right?', explain: why });
  },
});

// ---------------------------------------------------------------- Word Power
const EN_WORDS = [
  [1, 'A person who teaches in a school', 'teacher', ['doctor', 'farmer', 'driver']],
  [1, 'A person who treats sick people', 'doctor', ['teacher', 'tailor', 'pilot']],
  [1, 'A person who flies an aeroplane', 'pilot', ['driver', 'sailor', 'guard']],
  [1, 'A person who grows crops', 'farmer', ['barber', 'tailor', 'driver']],
  [1, 'A person who stitches clothes', 'tailor', ['barber', 'cobbler', 'potter']],
  [1, 'A person who cuts hair', 'barber', ['tailor', 'potter', 'plumber']],
  [1, 'A place where we can see wild animals in cages', 'zoo', ['park', 'farm', 'school']],
  [1, 'A place where we borrow books to read', 'library', ['hospital', 'bakery', 'factory']],
  [1, 'Young one of a cat', 'kitten', ['puppy', 'calf', 'cub']],
  [1, 'Young one of a dog', 'puppy', ['kitten', 'calf', 'foal']],
  [1, 'The home of a bird', 'nest', ['den', 'hive', 'stable']],
  [1, 'The sound made by a dog', 'bark', ['roar', 'moo', 'hiss']],
  [2, 'A doctor who treats teeth', 'dentist', ['surgeon', 'nurse', 'chemist']],
  [2, 'A person who repairs taps and water pipes', 'plumber', ['carpenter', 'electrician', 'mason']],
  [2, 'A person who makes things out of wood', 'carpenter', ['plumber', 'potter', 'blacksmith']],
  [2, 'A person who makes pots out of clay', 'potter', ['carpenter', 'tailor', 'weaver']],
  [2, 'A place where aeroplanes land and take off', 'airport', ['harbour', 'station', 'garage']],
  [2, 'A place where ships stop to load and unload', 'harbour', ['airport', 'garage', 'platform']],
  [2, 'The house of a king', 'palace', ['hut', 'cottage', 'tent']],
  [2, 'The home of a lion', 'den', ['nest', 'hive', 'stable']],
  [2, 'The sound made by a horse', 'neigh', ['bark', 'roar', 'hiss']],
  [2, 'A ___ of cows', 'herd', ['flock', 'swarm', 'pack']],
  [2, 'A ___ of sheep', 'flock', ['swarm', 'pack', 'bunch']],
  [2, 'A ___ of bees', 'swarm', ['herd', 'flock', 'pack']],
  [2, 'A ___ of grapes', 'bunch', ['herd', 'swarm', 'flock']],
  [3, 'An animal that eats only plants', 'herbivore', ['carnivore', 'omnivore', 'predator']],
  [3, 'An animal that eats only meat', 'carnivore', ['herbivore', 'omnivore', 'vegetarian']],
  [3, 'A person who sells flowers', 'florist', ['chemist', 'grocer', 'jeweller']],
  [3, 'A person who sells medicines', 'chemist', ['florist', 'grocer', 'jeweller']],
  [3, 'A person who cannot hear', 'deaf', ['blind', 'lazy', 'shy']],
  [3, 'A ___ of wolves', 'pack', ['herd', 'flock', 'swarm']],
  [3, 'A ___ of fish', 'school', ['herd', 'flock', 'pack']],
  [3, 'A ___ of flowers', 'bouquet', ['herd', 'pack', 'swarm']],
  [3, 'Something that we can see through', 'transparent', ['opaque', 'invisible', 'colourful']],
  [3, 'A person who writes poems', 'poet', ['painter', 'singer', 'actor']],
  [3, 'A person who does not eat meat', 'vegetarian', ['carnivore', 'butcher', 'hunter']],
  [3, 'A home for children who have no parents', 'orphanage', ['hostel', 'hospital', 'office']],
];

registerGen({
  id: 'en_words', section: 'eng', icon: '💡', title: 'Word Power',
  desc: 'One word for many, homes, sounds, young ones and groups.',
  gen(level) {
    const [, q, a, wrong] = U.pick(atLevel(EN_WORDS, level));
    const blank = q.includes('___');
    return U.mcq({
      q: blank ? `Fill in the group word: <b>${q}</b>` : `Give one word for: <b>${q}</b>`, correct: a, wrong,
      hint: blank ? 'A group of animals or things has a special name (a herd of cows).' : 'Think of the special name for this person, place or thing.',
      explain: blank ? `<b>${q.replace('___', a)}</b>.` : `${q} = <b>${a}</b>.`,
    });
  },
});

// ---------------------------------------------------------------- Word Puzzles
const EN_JUMBLE = {
  1: { fruit: ['MANGO', 'APPLE', 'GRAPE', 'LEMON', 'GUAVA', 'PEACH'], animal: ['TIGER', 'ZEBRA', 'CAMEL', 'MOUSE', 'HORSE', 'SHEEP'], colour: ['GREEN', 'BROWN', 'WHITE', 'BLACK'] },
  2: { animal: ['MONKEY', 'RABBIT', 'DONKEY', 'JACKAL'], food: ['ORANGE', 'BANANA', 'CARROT', 'TOMATO', 'POTATO'], bird: ['PARROT', 'PIGEON', 'CANARY', 'TURKEY'], 'school thing': ['PENCIL', 'CRAYON', 'ERASER', 'SCALE'] },
  3: { animal: ['ELEPHANT', 'KANGAROO', 'SQUIRREL', 'CROCODILE'], bird: ['PEACOCK', 'SPARROW', 'OSTRICH', 'PENGUIN'], place: ['HOSPITAL', 'LIBRARY', 'KITCHEN', 'TEMPLE'], fruit: ['PINEAPPLE', 'COCONUT', 'APRICOT', 'MULBERRY'] },
};
const EN_DICT = ['cat', 'cake', 'camel', 'car', 'cap', 'card', 'ball', 'bat', 'bag', 'banana', 'bank', 'park', 'paper', 'parrot', 'pan', 'star', 'stone', 'story', 'stop', 'street',
  'chair', 'chalk', 'cheese', 'child', 'church', 'tree', 'train', 'truck', 'trip', 'trumpet', 'ship', 'shoe', 'shop', 'shirt', 'sheep', 'moon', 'mother', 'monkey', 'money', 'morning',
  'apple', 'ant', 'arm', 'egg', 'eagle', 'ear', 'fish', 'flag', 'flower', 'frog', 'girl', 'goat', 'grass', 'hand', 'horse', 'house', 'ink', 'island', 'jug', 'jam', 'kite', 'king', 'kettle',
  'lamp', 'lion', 'leaf', 'nest', 'nose', 'net', 'owl', 'orange', 'queen', 'rain', 'rose', 'river', 'sun', 'table', 'tiger', 'umbrella', 'van', 'water', 'window', 'yak', 'zebra'];

registerGen({
  id: 'en_puzzle', section: 'eng', icon: '🧩', title: 'Word Puzzles',
  desc: 'Jumbled letters and dictionary (alphabetical) order.',
  gen(level) {
    if (Math.random() < 0.5) {
      const cats = EN_JUMBLE[level], cat = U.pick(Object.keys(cats)), words = cats[cat], w = U.pick(words);
      let mix; do { mix = U.shuffle(w.split('')); } while (mix.join('') === w);
      return U.mcq({
        q: `Arrange the letters to make a word. <small>(It is ${/^[aeiou]/.test(cat) ? 'an' : 'a'} <b>${cat}</b>.)</small>`, visual: seriesBox(mix),
        correct: w, wrong: words.filter(x => x !== w),
        hint: 'Count the letters. The right word uses ALL of these letters exactly once.',
        explain: `${mix.join(' ')} → <b>${w}</b>. Each letter is used once.`,
      });
    }
    // dictionary order
    let pick;
    if (level === 1) {
      const byFirst = {}; EN_DICT.forEach(w => (byFirst[w[0]] = byFirst[w[0]] || []).push(w));
      pick = U.sample(Object.keys(byFirst), 4).map(k => U.pick(byFirst[k]));
    } else {
      const n = level === 2 ? 1 : 2, groups = {};
      EN_DICT.forEach(w => (groups[w.slice(0, n)] = groups[w.slice(0, n)] || []).push(w));
      const ok = Object.values(groups).filter(g => g.length >= 4);
      pick = U.sample(U.pick(ok), 4);
    }
    const sorted = pick.slice().sort(), first = Math.random() < 0.6, ans = first ? sorted[0] : sorted[3];
    return U.mcq({
      q: `Which word will come <b>${first ? 'first' : 'last'}</b> in a dictionary?`, correct: ans, wrong: pick.filter(x => x !== ans),
      hint: level === 1 ? 'Look at the first letter of each word and think of A, B, C … order.' : 'The first letters are the same, so compare the next letter.',
      explain: `In alphabetical order: ${sorted.join(' → ')}.<br>So <b>${ans}</b> comes ${first ? 'first' : 'last'}.`,
    });
  },
});

// ================================================================ MARATHI (मराठी)
// [level, word, answer, wrongs, english]
const MR_SYN = [
  [1, 'आई', 'माता', ['पिता', 'बहीण', 'मावशी'], 'mother'], [1, 'वडील', 'पिता', ['माता', 'भाऊ', 'काका'], 'father'],
  [1, 'पाणी', 'जल', ['अग्नी', 'वायू', 'अन्न'], 'water'], [1, 'घर', 'सदन', ['शाळा', 'रस्ता', 'बाग'], 'house'],
  [1, 'फूल', 'पुष्प', ['पान', 'फळ', 'झाड'], 'flower'], [1, 'झाड', 'वृक्ष', ['फूल', 'पान', 'गवत'], 'tree'],
  [1, 'डोळा', 'नयन', ['कान', 'नाक', 'हात'], 'eye'], [1, 'हात', 'कर', ['पाय', 'डोके', 'पोट'], 'hand'],
  [1, 'मित्र', 'सखा', ['शत्रू', 'गुरू', 'भाऊ'], 'friend'], [1, 'शाळा', 'विद्यालय', ['रुग्णालय', 'ग्रंथालय', 'कार्यालय'], 'school'],
  [1, 'दिवस', 'दिन', ['रात्र', 'संध्याकाळ', 'पहाट'], 'day'], [1, 'पुस्तक', 'ग्रंथ', ['वही', 'पेन', 'पाटी'], 'book'],
  [1, 'सूर्य', 'रवी', ['चंद्र', 'तारा', 'ढग'], 'sun'],
  [2, 'चंद्र', 'शशी', ['सूर्य', 'तारा', 'आकाश'], 'moon'], [2, 'आकाश', 'आभाळ', ['जमीन', 'समुद्र', 'डोंगर'], 'sky'],
  [2, 'समुद्र', 'सागर', ['नदी', 'तलाव', 'ओढा'], 'sea'], [2, 'नदी', 'सरिता', ['समुद्र', 'तलाव', 'विहीर'], 'river'],
  [2, 'डोंगर', 'पर्वत', ['नदी', 'दरी', 'मैदान'], 'mountain'], [2, 'वारा', 'पवन', ['पाणी', 'अग्नी', 'ढग'], 'wind'],
  [2, 'पक्षी', 'खग', ['मासा', 'प्राणी', 'किडा'], 'bird'], [2, 'कमळ', 'पंकज', ['गुलाब', 'मोगरा', 'झेंडू'], 'lotus'],
  [2, 'सोने', 'सुवर्ण', ['चांदी', 'लोखंड', 'तांबे'], 'gold'], [2, 'आनंद', 'हर्ष', ['दुःख', 'राग', 'भीती'], 'joy'],
  [2, 'राग', 'क्रोध', ['आनंद', 'प्रेम', 'दया'], 'anger'], [2, 'घोडा', 'अश्व', ['हत्ती', 'गाढव', 'बैल'], 'horse'],
  [2, 'हत्ती', 'गज', ['घोडा', 'सिंह', 'उंट'], 'elephant'], [2, 'जमीन', 'भूमी', ['आकाश', 'पाणी', 'वारा'], 'land'],
  [3, 'रात्र', 'निशा', ['दिवस', 'सकाळ', 'दुपार'], 'night'], [3, 'अंधार', 'तिमिर', ['प्रकाश', 'उजेड', 'सूर्य'], 'darkness'],
  [3, 'राजा', 'नृप', ['प्रजा', 'राणी', 'मंत्री'], 'king'], [3, 'सिंह', 'केसरी', ['वाघ', 'हत्ती', 'कोल्हा'], 'lion'],
  [3, 'ढग', 'मेघ', ['पाऊस', 'वीज', 'वारा'], 'cloud'], [3, 'पाऊस', 'वर्षा', ['ऊन', 'थंडी', 'वारा'], 'rain'],
  [3, 'शेतकरी', 'बळीराजा', ['व्यापारी', 'सैनिक', 'शिक्षक'], 'farmer'], [3, 'काळजी', 'चिंता', ['आनंद', 'धैर्य', 'राग'], 'worry'],
  [3, 'देव', 'ईश्वर', ['भक्त', 'मंदिर', 'पुजारी'], 'god'], [3, 'साप', 'सर्प', ['बेडूक', 'मासा', 'उंदीर'], 'snake'],
  [3, 'मुलगा', 'पुत्र', ['कन्या', 'वडील', 'भाऊ'], 'son'], [3, 'प्रकाश', 'उजेड', ['अंधार', 'सावली', 'रात्र'], 'light'],
];
const MR_ANT = [
  [1, 'दिवस', 'रात्र', ['दिन', 'सकाळ', 'दुपार'], 'day ↔ night'], [1, 'सुख', 'दुःख', ['आनंद', 'समाधान', 'हर्ष'], 'happiness ↔ sorrow'],
  [1, 'चांगला', 'वाईट', ['उत्तम', 'छान', 'सुंदर'], 'good ↔ bad'], [1, 'मोठा', 'लहान', ['विशाल', 'प्रचंड', 'थोर'], 'big ↔ small'],
  [1, 'गरम', 'थंड', ['उष्ण', 'कोमट', 'तापलेला'], 'hot ↔ cold'], [1, 'जुना', 'नवा', ['प्राचीन', 'जीर्ण', 'पुराणा'], 'old ↔ new'],
  [1, 'खरे', 'खोटे', ['सत्य', 'योग्य', 'बरोबर'], 'true ↔ false'], [1, 'वर', 'खाली', ['उंच', 'वरती', 'आकाश'], 'up ↔ down'],
  [1, 'गोड', 'कडू', ['मधुर', 'रुचकर', 'चविष्ट'], 'sweet ↔ bitter'], [1, 'श्रीमंत', 'गरीब', ['धनवान', 'राजा', 'सावकार'], 'rich ↔ poor'],
  [1, 'हसणे', 'रडणे', ['खेळणे', 'बोलणे', 'गाणे'], 'laugh ↔ cry'], [1, 'पुढे', 'मागे', ['समोर', 'अगोदर', 'जवळ'], 'front ↔ back'],
  [2, 'जवळ', 'लांब', ['शेजारी', 'पाशी', 'निकट'], 'near ↔ far'], [2, 'प्रकाश', 'अंधार', ['उजेड', 'तेज', 'दिवा'], 'light ↔ dark'],
  [2, 'स्वच्छ', 'अस्वच्छ', ['निर्मळ', 'साफ', 'सुंदर'], 'clean ↔ dirty'], [2, 'शत्रू', 'मित्र', ['वैरी', 'दुश्मन', 'रिपू'], 'enemy ↔ friend'],
  [2, 'जय', 'पराजय', ['विजय', 'यश', 'जीत'], 'victory ↔ defeat'], [2, 'सोपा', 'कठीण', ['सरळ', 'सहज', 'साधा'], 'easy ↔ difficult'],
  [2, 'हलका', 'जड', ['सोपा', 'लहान', 'पातळ'], 'light ↔ heavy'], [2, 'धीट', 'भित्रा', ['शूर', 'निर्भय', 'धाडसी'], 'brave ↔ timid'],
  [2, 'ओला', 'सुका', ['भिजलेला', 'दमट', 'ओलसर'], 'wet ↔ dry'], [2, 'लवकर', 'उशिरा', ['पटकन', 'झटपट', 'त्वरित'], 'early ↔ late'],
  [2, 'आवडता', 'नावडता', ['प्रिय', 'लाडका', 'आवडीचा'], 'liked ↔ disliked'], [2, 'पूर्व', 'पश्चिम', ['उत्तर', 'दक्षिण', 'ईशान्य'], 'east ↔ west'],
  [3, 'यश', 'अपयश', ['विजय', 'जय', 'कीर्ती'], 'success ↔ failure'], [3, 'सुरुवात', 'शेवट', ['प्रारंभ', 'आरंभ', 'उगम'], 'beginning ↔ end'],
  [3, 'आठवणे', 'विसरणे', ['स्मरणे', 'आठवण', 'ध्यानात येणे'], 'remember ↔ forget'], [3, 'स्वस्त', 'महाग', ['सोपा', 'सवंग', 'साधा'], 'cheap ↔ costly'],
  [3, 'आळशी', 'उद्योगी', ['सुस्त', 'मंद', 'निद्रिस्त'], 'lazy ↔ hardworking'], [3, 'ज्ञान', 'अज्ञान', ['विद्या', 'माहिती', 'शिक्षण'], 'knowledge ↔ ignorance'],
  [3, 'आशा', 'निराशा', ['इच्छा', 'अपेक्षा', 'उमेद'], 'hope ↔ despair'], [3, 'स्तुती', 'निंदा', ['कौतुक', 'प्रशंसा', 'गौरव'], 'praise ↔ criticism'],
  [3, 'उदय', 'अस्त', ['उगम', 'आरंभ', 'सुरुवात'], 'rise ↔ setting'], [3, 'सजीव', 'निर्जीव', ['जिवंत', 'प्राणी', 'चपळ'], 'living ↔ non-living'],
  [3, 'स्वदेश', 'परदेश', ['मायदेश', 'जन्मभूमी', 'देश'], 'own country ↔ foreign country'],
];

registerGen({
  id: 'mr_syn', section: 'mar', lang: 'mr', icon: '🤝', title: 'समानार्थी शब्द',
  desc: 'Same meaning words in Marathi.',
  gen(level) {
    const [, w, a, wrong, en] = U.pick(atLevel(MR_SYN, level));
    return U.mcq({
      q: `'<b>${w}</b>' या शब्दाचा <b>समानार्थी</b> शब्द कोणता?`, correct: a, wrong,
      hint: 'समानार्थी म्हणजे सारखा अर्थ असणारा शब्द. (Same meaning)',
      explain: `${w} = <b>${a}</b> (${en}).`,
    });
  },
});

registerGen({
  id: 'mr_ant', section: 'mar', lang: 'mr', icon: '↔️', title: 'विरुद्धार्थी शब्द',
  desc: 'Opposite meaning words in Marathi.',
  gen(level) {
    const [, w, a, wrong, en] = U.pick(atLevel(MR_ANT, level));
    return U.mcq({
      q: `'<b>${w}</b>' या शब्दाचा <b>विरुद्धार्थी</b> शब्द कोणता?`, correct: a, wrong,
      hint: 'विरुद्धार्थी म्हणजे उलट अर्थाचा शब्द (दिवस ↔ रात्र). सावध! काही पर्याय सारख्या अर्थाचे आहेत.',
      explain: `${w} ↔ <b>${a}</b> (${en}).`,
    });
  },
});

// ---------------------------------------------------------------- वाक्प्रचार व म्हणी
// [level, phrase, meaning, group, literal-trap, english, isProverb]
const MR_IDIOM = [
  [1, 'पोटात कावळे ओरडणे', 'खूप भूक लागणे', 'hunger', 'पोटात दुखणे', 'to be very hungry'],
  [1, 'कान टवकारणे', 'लक्षपूर्वक ऐकणे', 'listen', 'कान दुखणे', 'to listen carefully'],
  [1, 'डोळे भरून येणे', 'रडू येणे', 'cry', 'डोळ्यात कचरा जाणे', 'to have tears in the eyes'],
  [1, 'आनंद गगनात न मावणे', 'खूप आनंद होणे', 'joy', 'आकाश लहान असणे', 'to be overjoyed'],
  [1, 'पाठ थोपटणे', 'शाबासकी देणे', 'praise', 'पाठ दुखणे', 'to praise someone'],
  [1, 'हात देणे', 'मदत करणे', 'help', 'हस्तांदोलन करणे', 'to help'],
  [1, 'धूम ठोकणे', 'वेगाने पळून जाणे', 'run', 'धूर काढणे', 'to run away fast'],
  [1, 'डोळा लागणे', 'झोप लागणे', 'sleep', 'डोळ्याला मार लागणे', 'to fall asleep'],
  [2, 'तोंडचे पाणी पळणे', 'खूप घाबरणे', 'fear', 'तहान लागणे', 'to be very scared'],
  [2, 'कंबर कसणे', 'एखादे काम करण्यास जिद्दीने तयार होणे', 'ready', 'पट्टा बांधणे', 'to get ready with determination'],
  [2, 'नाक मुरडणे', 'नापसंती दाखवणे', 'dislike', 'सर्दी होणे', 'to show dislike'],
  [2, 'डोळ्यांचे पारणे फिटणे', 'पाहून मन तृप्त होणे', 'satisfied', 'डोळे उघडणे', 'to be delighted by a sight'],
  [2, 'तोंडाला पाणी सुटणे', 'खाण्याची तीव्र इच्छा होणे', 'crave', 'तोंड धुणे', 'mouth watering'],
  [2, 'अंगाचा तिळपापड होणे', 'खूप राग येणे', 'anger', 'अंगाला तिळाचे तेल लावणे', 'to be very angry'],
  [2, 'हात टेकणे', 'हार मानणे', 'defeat', 'हात जमिनीवर ठेवणे', 'to give up'],
  [2, 'तोंड देणे', 'सामना करणे', 'face', 'घास भरवणे', 'to face a difficulty'],
  [2, 'थक्क होणे', 'आश्चर्यचकित होणे', 'surprise', 'थकून जाणे', 'to be amazed'],
  [2, 'काढता पाय घेणे', 'तेथून निघून जाणे', 'leave', 'पाय ओढणे', 'to leave quietly'],
  [3, 'पोटात गोळा येणे', 'खूप भीती वाटणे', 'fear', 'पोटात दुखणे', 'to feel very frightened'],
  [3, 'डोक्यावर घेणे', 'खूप लाड करणे', 'pamper', 'डोक्यावर ओझे घेणे', 'to pamper / spoil'],
  [3, 'कानउघाडणी करणे', 'चूक लक्षात आणून देऊन समज देणे', 'scold', 'कान स्वच्छ करणे', 'to scold / warn'],
  [3, 'गुडघे टेकणे', 'शरण जाणे', 'defeat', 'गुडघ्यावर बसणे', 'to surrender'],
  [3, 'हिरमुसले होणे', 'नाराज होणे', 'upset', 'हिरवे होणे', 'to feel let down'],
  [3, 'गाजावाजा करणे', 'खूप प्रसिद्धी करणे', 'publicity', 'ढोल वाजवणे', 'to make a big show of something'],
  [3, 'थेंबे थेंबे तळे साचे', 'थोडे थोडे जमवल्याने मोठा संग्रह होतो', 'p-save', 'पावसाने तळे भरते', 'little drops make an ocean', true],
  [3, 'नाचता येईना अंगण वाकडे', 'स्वतःचा दोष न पाहता दुसऱ्याला दोष देणे', 'p-blame', 'अंगण वाकडे असणे', 'a bad workman blames his tools', true],
  [3, 'उथळ पाण्याला खळखळाट फार', 'अंगी थोडा गुण असणारा जास्त बढाई मारतो', 'p-boast', 'नदीचे पाणी आवाज करते', 'empty vessels make the most noise', true],
  [3, 'दुरून डोंगर साजरे', 'दुरून गोष्टी चांगल्या दिसतात, जवळ गेल्यावर खरे रूप कळते', 'p-far', 'डोंगर दूर असतो', 'distance lends charm', true],
  [3, 'अति तेथे माती', 'कोणत्याही गोष्टीचा अतिरेक वाईट असतो', 'p-excess', 'खूप माती असणे', 'too much of anything is bad', true],
  [3, 'कामापुरता मामा', 'काम असेपर्यंतच गोड बोलणे', 'p-selfish', 'मामा काम करतो', 'friendly only when there is work', true],
  [3, 'चोराच्या मनात चांदणे', 'वाईट काम करणाऱ्याला नेहमी भीती वाटते', 'p-guilt', 'रात्री चांदणे पडते', 'a guilty mind is always afraid', true],
  [3, 'गरज सरो वैद्य मरो', 'गरज संपली की मदत करणाऱ्याला विसरणे', 'p-ungrateful', 'वैद्य आजारी पडणे', 'forgetting a helper once the need is over', true],
];

registerGen({
  id: 'mr_idiom', section: 'mar', lang: 'mr', icon: '💬', title: 'वाक्प्रचार व म्हणी',
  desc: 'Meanings of Marathi idioms and proverbs.',
  gen(level) {
    const pool = atLevel(MR_IDIOM, level);
    const item = U.pick(pool), [, ph, mean, grp, trap, en, prov] = item;
    const others = U.shuffle(MR_IDIOM.filter(r => r[3] !== grp && !!r[6] === !!prov)).map(r => r[2]);
    return U.mcq({
      q: `'<b>${ph}</b>' या ${prov ? 'म्हणीचा' : 'वाक्प्रचाराचा'} अर्थ कोणता?`, correct: mean, wrong: [trap].concat(others),
      hint: prov ? 'म्हणीचा अर्थ शब्दशः नसतो — त्यामागचा धडा शोधा.' : 'वाक्प्रचाराचा अर्थ शब्दशः (literal) नसतो!',
      explain: `${ph} — <b>${mean}</b>.<br><small>(English: ${en})</small>`,
    });
  },
});

// ---------------------------------------------------------------- व्याकरण
const MR_PLURAL = [
  [1, 'घोडा', 'घोडे', ['घोडी', 'घोड्याला', 'घोड्याचा']], [1, 'मुलगा', 'मुलगे', ['मुलगी', 'मुलग्याला', 'मुलाचा']],
  [1, 'पुस्तक', 'पुस्तके', ['पुस्तकाचा', 'पुस्तकात', 'पुस्तकाला']], [1, 'घर', 'घरे', ['घराचा', 'घरात', 'घरी']],
  [1, 'फूल', 'फुले', ['फुलाचा', 'फुलात', 'फुलाला']], [1, 'आंबा', 'आंबे', ['आंबट', 'आंब्याचा', 'आंब्याला']],
  [1, 'दिवा', 'दिवे', ['दिव्याला', 'दिव्याचा', 'दिवाळी']], [1, 'डोळा', 'डोळे', ['डोळ्याला', 'डोळ्यात', 'डोळ्याचा']],
  [2, 'वही', 'वह्या', ['वहीचा', 'वहीत', 'वहीला']], [2, 'नदी', 'नद्या', ['नदीचा', 'नदीत', 'नदीला']],
  [2, 'मुलगी', 'मुली', ['मुलगा', 'मुलीला', 'मुलीचा']], [2, 'बहीण', 'बहिणी', ['भाऊ', 'बहिणीला', 'बहिणीचा']],
  [2, 'पान', 'पाने', ['पानाला', 'पानात', 'पानाचा']], [2, 'चिमणी', 'चिमण्या', ['चिमणा', 'चिमणीला', 'चिमणीचा']],
  [2, 'खिडकी', 'खिडक्या', ['खिडकीला', 'खिडकीत', 'खिडकीचा']], [2, 'भिंत', 'भिंती', ['भिंतीला', 'भिंतीत', 'भिंतीचा']],
  [3, 'शाळा', 'शाळा', ['शाळेत', 'शाळेला', 'शाळेचा']], [3, 'भाऊ', 'भाऊ', ['भावाला', 'भावाचा', 'भावंड']],
  [3, 'केळे', 'केळी', ['केळ्याचा', 'केळ्यात', 'केळ्याला']], [3, 'माळ', 'माळा', ['माळेला', 'माळेचा', 'माळेत']],
];
const MR_GENDER = [
  [1, 'मुलगा', 'मुलगी'], [1, 'राजा', 'राणी'], [1, 'भाऊ', 'बहीण'], [1, 'काका', 'काकू'], [1, 'मामा', 'मामी'], [1, 'आजोबा', 'आजी'],
  [2, 'वाघ', 'वाघीण'], [2, 'सिंह', 'सिंहीण'], [2, 'घोडा', 'घोडी'], [2, 'कोंबडा', 'कोंबडी'], [2, 'शिक्षक', 'शिक्षिका'], [2, 'कुत्रा', 'कुत्री'],
  [3, 'मोर', 'लांडोर'], [3, 'बैल', 'गाय'], [3, 'बोकड', 'शेळी'], [3, 'हत्ती', 'हत्तीण'], [3, 'विद्यार्थी', 'विद्यार्थिनी'], [3, 'चिमणा', 'चिमणी'],
];
// [level, sentence, underlined word, part of speech]
const MR_POS = [
  [1, 'राम शाळेत जातो.', 'राम', 'नाम'], [1, 'मुले मैदानात खेळतात.', 'खेळतात', 'क्रियापद'],
  [1, 'पक्षी आकाशात उडतात.', 'पक्षी', 'नाम'], [1, 'पक्षी आकाशात उडतात.', 'उडतात', 'क्रियापद'],
  [1, 'आई स्वयंपाक करते.', 'आई', 'नाम'], [1, 'बाळ झोपले.', 'झोपले', 'क्रियापद'],
  [2, 'ती गाणे गाते.', 'ती', 'सर्वनाम'], [2, 'आम्ही सहलीला गेलो.', 'आम्ही', 'सर्वनाम'],
  [2, 'आंबा गोड आहे.', 'गोड', 'विशेषण'], [2, 'लाल फूल सुंदर दिसते.', 'लाल', 'विशेषण'],
  [2, 'तो रोज अभ्यास करतो.', 'तो', 'सर्वनाम'], [2, 'मी पुस्तक वाचते.', 'वाचते', 'क्रियापद'],
  [3, 'उंच झाडावर माकड बसले.', 'उंच', 'विशेषण'], [3, 'उंच झाडावर माकड बसले.', 'माकड', 'नाम'],
  [3, 'हुशार मुलगी पहिली आली.', 'हुशार', 'विशेषण'], [3, 'त्यांनी मला मदत केली.', 'त्यांनी', 'सर्वनाम'],
  [3, 'मुंबई मोठे शहर आहे.', 'मुंबई', 'नाम'], [3, 'मुंबई मोठे शहर आहे.', 'मोठे', 'विशेषण'],
  [3, 'मी पुस्तक वाचते.', 'मी', 'सर्वनाम'], [3, 'आजी गोष्ट सांगते.', 'सांगते', 'क्रियापद'],
];
const POS_WHY = {
  'नाम': 'व्यक्ती, वस्तू, प्राणी किंवा ठिकाणाचे नाव म्हणजे नाम (noun).',
  'सर्वनाम': 'नामाऐवजी वापरला जाणारा शब्द म्हणजे सर्वनाम (pronoun).',
  'विशेषण': 'नामाबद्दल अधिक माहिती सांगणारा शब्द म्हणजे विशेषण (adjective).',
  'क्रियापद': 'क्रिया दाखवणारा शब्द म्हणजे क्रियापद (verb).',
};

registerGen({
  id: 'mr_grammar', section: 'mar', lang: 'mr', icon: '📝', title: 'व्याकरण',
  desc: 'वचन, लिंग आणि शब्दांच्या जाती (Marathi grammar).',
  gen(level) {
    const kind = U.pick(['plural', 'gender', 'pos', 'pos']);
    if (kind === 'plural') {
      const [, w, a, wrong] = U.pick(atLevel(MR_PLURAL, level));
      return U.mcq({ q: `'<b>${w}</b>' या शब्दाचे <b>अनेकवचन</b> कोणते?`, correct: a, wrong,
        hint: 'अनेकवचन म्हणजे एकापेक्षा जास्त (एक घोडा → अनेक …).',
        explain: `एक ${w} → अनेक <b>${a}</b>.${w === a ? ' हा शब्द अनेकवचनात बदलत नाही!' : ''}` });
    }
    if (kind === 'gender') {
      const [, m, f] = U.pick(atLevel(MR_GENDER, level));
      return U.mcq({ q: `'<b>${m}</b>' या शब्दाचे <b>स्त्रीलिंगी</b> रूप कोणते?`, correct: f,
        wrong: U.shuffle(MR_GENDER.filter(r => r[2] !== f && r[1] !== m)).map(r => r[2]),
        hint: 'स्त्रीलिंगी म्हणजे मादी/स्त्री दर्शवणारे रूप (मुलगा → मुलगी).',
        explain: `${m} → <b>${f}</b>.` });
    }
    const [, s, w, a] = U.pick(atLevel(MR_POS, level));
    return U.mcq({ q: `अधोरेखित शब्दाची <b>जात</b> ओळखा:<br><span class="sent">${s.replace(w, `<u>${w}</u>`)}</span>`,
      correct: a, wrong: ['नाम', 'सर्वनाम', 'विशेषण', 'क्रियापद'].filter(x => x !== a), fixedOrder: ['नाम', 'सर्वनाम', 'विशेषण', 'क्रियापद'],
      hint: 'नाम = नाव, सर्वनाम = नामाऐवजी, विशेषण = नामाबद्दल माहिती, क्रियापद = क्रिया.',
      explain: `'${w}' हे <b>${a}</b> आहे.<br>${POS_WHY[a]}` });
  },
});

// ---------------------------------------------------------------- शब्दसमूहाबद्दल एक शब्द
const MR_ONEWORD = [
  [1, 'शेती करणारा', 'शेतकरी', ['व्यापारी', 'कारागीर', 'शिपाई']], [1, 'कपडे शिवणारा', 'शिंपी', ['धोबी', 'सुतार', 'लोहार']],
  [1, 'कपडे धुणारा', 'धोबी', ['शिंपी', 'माळी', 'सुतार']], [1, 'बागेची काळजी घेणारा', 'माळी', ['धोबी', 'शिंपी', 'कुंभार']],
  [1, 'गाडी चालवणारा', 'चालक', ['वाहक', 'प्रवासी', 'मालक']], [1, 'कविता लिहिणारा', 'कवी', ['लेखक', 'गायक', 'चित्रकार']],
  [1, 'चित्र काढणारा', 'चित्रकार', ['कवी', 'गायक', 'लेखक']], [1, 'गाणे गाणारा', 'गायक', ['कवी', 'चित्रकार', 'वादक']],
  [1, 'पुस्तके ठेवण्याची जागा', 'ग्रंथालय', ['रुग्णालय', 'विद्यालय', 'कार्यालय']],
  [2, 'रुग्णांवर उपचार करण्याची जागा', 'रुग्णालय', ['ग्रंथालय', 'विद्यालय', 'कार्यालय']],
  [2, 'लाकडापासून वस्तू बनवणारा', 'सुतार', ['लोहार', 'कुंभार', 'सोनार']], [2, 'मातीची भांडी बनवणारा', 'कुंभार', ['सुतार', 'लोहार', 'सोनार']],
  [2, 'सोन्याचे दागिने बनवणारा', 'सोनार', ['लोहार', 'कुंभार', 'सुतार']], [2, 'लोखंडाच्या वस्तू बनवणारा', 'लोहार', ['सोनार', 'सुतार', 'कुंभार']],
  [2, 'देशासाठी लढणारा', 'सैनिक', ['शेतकरी', 'नेता', 'व्यापारी']], [2, 'देवाची पूजा करणारा', 'पुजारी', ['भक्त', 'संत', 'सेवक']],
  [2, 'दररोज प्रसिद्ध होणारे (वृत्तपत्र)', 'दैनिक', ['साप्ताहिक', 'मासिक', 'वार्षिक']],
  [2, 'आठवड्यातून एकदा प्रसिद्ध होणारे', 'साप्ताहिक', ['दैनिक', 'मासिक', 'वार्षिक']],
  [2, 'महिन्यातून एकदा प्रसिद्ध होणारे', 'मासिक', ['दैनिक', 'साप्ताहिक', 'वार्षिक']],
  [3, 'ज्याला आई-वडील नाहीत असा', 'अनाथ', ['गरीब', 'आजारी', 'अज्ञानी']], [3, 'खूप बडबड करणारा', 'बडबड्या', ['मितभाषी', 'अबोल', 'शांत']],
  [3, 'दुसऱ्यावर उपकार करणारा', 'परोपकारी', ['स्वार्थी', 'कंजूष', 'आळशी']], [3, 'ज्याला कोणी शत्रू नाही असा', 'अजातशत्रू', ['परोपकारी', 'शूरवीर', 'दानशूर']],
  [3, 'सतत काम करणारा', 'उद्योगी', ['आळशी', 'निद्रिस्त', 'ऐतखाऊ']], [3, 'डोळ्यांना न दिसणारे', 'अदृश्य', ['अमर', 'अनाथ', 'अतुलनीय']],
  [3, 'ज्याची तुलना करता येत नाही असे', 'अतुलनीय', ['अदृश्य', 'अमर', 'अनमोल']], [3, 'फक्त पाण्यात राहणारे प्राणी', 'जलचर', ['भूचर', 'नभचर', 'निशाचर']],
  [3, 'रात्री फिरणारे प्राणी', 'निशाचर', ['जलचर', 'भूचर', 'नभचर']], [3, 'खूप दान करणारा', 'दानशूर', ['कंजूष', 'गरीब', 'स्वार्थी']],
  [3, 'ज्याला मरण नाही असा', 'अमर', ['अनाथ', 'अदृश्य', 'अजातशत्रू']],
];

registerGen({
  id: 'mr_oneword', section: 'mar', lang: 'mr', icon: '🎯', title: 'शब्दसमूहाबद्दल एक शब्द',
  desc: 'One word for a group of words (Marathi).',
  gen(level) {
    const [, ph, a, wrong] = U.pick(atLevel(MR_ONEWORD, level));
    return U.mcq({
      q: `खालील शब्दसमूहासाठी <b>एक शब्द</b> निवडा:<br><span class="sent">${ph}</span>`, correct: a, wrong,
      hint: 'शब्दसमूहाचा पूर्ण अर्थ सांगणारा एकच शब्द शोधा.',
      explain: `${ph} — <b>${a}</b>.`,
    });
  },
});

// ---------------------------------------------------------------- शब्दांचे खेळ
// [level, aksharas, clue]
const MR_JUMBLE = [
  [1, ['क', 'म', 'ळ'], 'फूल'], [1, ['ना', 'र', 'ळ'], 'फळ'], [1, ['गा', 'ज', 'र'], 'भाजी'], [1, ['आ', 'का', 'श'], 'वर दिसते'],
  [1, ['वि', 'मा', 'न'], 'वाहन'], [1, ['बा', 'स', 'री'], 'वाद्य'], [1, ['जं', 'ग', 'ल'], 'झाडांचे ठिकाण'], [1, ['प', 'तं', 'ग'], 'खेळणे'],
  [2, ['गु', 'ला', 'ब'], 'फूल'], [2, ['दि', 'वा', 'ळी'], 'सण'], [2, ['खि', 'ड', 'की'], 'घराचा भाग'], [2, ['को', 'कि', 'ळा'], 'पक्षी'],
  [2, ['भो', 'प', 'ळा'], 'भाजी'], [2, ['चि', 'म', 'णी'], 'पक्षी'], [2, ['क', 'बू', 'त', 'र'], 'पक्षी'], [2, ['सा', 'य', 'क', 'ल'], 'वाहन'],
  [3, ['शे', 'त', 'क', 'री'], 'शेती करणारा'], [3, ['ट', 'र', 'बू', 'ज'], 'फळ'], [3, ['फु', 'ल', 'पा', 'ख', 'रू'], 'कीटक'],
  [3, ['पा', 'व', 'सा', 'ळा'], 'ऋतू'], [3, ['ग्रं', 'था', 'ल', 'य'], 'पुस्तकांचे ठिकाण'], [3, ['रु', 'ग्णा', 'ल', 'य'], 'दवाखाना'],
];
const MR_ORDER = 'अआइईउऊएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहळ';
const MR_DICT = ['अननस', 'आंबा', 'इमारत', 'ईश्वर', 'उंदीर', 'ऊस', 'एकता', 'ओढा', 'औषध', 'कमळ', 'खडू', 'गाय', 'घर', 'चमचा', 'छत्री', 'जहाज',
  'झाड', 'टरबूज', 'ठसा', 'डमरू', 'ढग', 'तलाव', 'थवा', 'दरवाजा', 'धनुष्य', 'नदी', 'पतंग', 'फणस', 'बदक', 'भोपळा', 'मासा', 'यंत्र', 'रथ',
  'लसूण', 'वड', 'शंख', 'षटकोन', 'ससा', 'हत्ती'];

registerGen({
  id: 'mr_wordplay', section: 'mar', lang: 'mr', icon: '🧩', title: 'शब्दांचे खेळ',
  desc: 'अक्षरे जुळवा आणि वर्णमाला क्रम (word games).',
  gen(level) {
    if (Math.random() < 0.55) {
      const [, ak, clue] = U.pick(atLevel(MR_JUMBLE, level)), w = ak.join('');
      let mix; do { mix = U.shuffle(ak); } while (mix.join('') === w);
      const wrong = []; for (let t = 0; t < 40 && wrong.length < 3; t++) { const p = U.shuffle(ak).join(''); if (p !== w && !wrong.includes(p)) wrong.push(p); }
      return U.mcq({
        q: `अक्षरे जुळवून योग्य शब्द बनवा. <small>(सूचना: ${clue})</small>`, visual: seriesBox(mix), correct: w, wrong,
        hint: 'सूचना वाचा आणि अर्थपूर्ण शब्द शोधा.',
        explain: `${mix.join(' - ')} → <b>${w}</b>.`,
      });
    }
    const words = U.sample(MR_DICT, 4), idx = w => MR_ORDER.indexOf(w[0]);
    const sorted = words.slice().sort((a, b) => idx(a) - idx(b));
    const first = level < 3 || Math.random() < 0.5, ans = first ? sorted[0] : sorted[3];
    return U.mcq({
      q: `मराठी वर्णमालेनुसार (शब्दकोशात) कोणता शब्द <b>${first ? 'सर्वात आधी' : 'सर्वात शेवटी'}</b> येईल?`, correct: ans, wrong: words.filter(x => x !== ans),
      hint: 'वर्णमाला: अ आ इ ई उ ऊ ए ऐ ओ औ, क ख ग घ, च छ ज झ, ट ठ ड ढ ण, त थ द ध न, प फ ब भ म, य र ल व, श ष स ह ळ.',
      explain: `पहिली अक्षरे: ${sorted.map(w => w[0]).join(', ')}. वर्णमालेचा क्रम: ${sorted.join(' → ')}.<br>म्हणून <b>${ans}</b>.`,
    });
  },
});
