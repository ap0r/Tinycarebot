const Applet = imports.ui.applet;
const St = imports.gi.St;
const Mainloop = imports.mainloop;

function MyApplet(metadata, orientation, panelHeight, instanceId) {
    this._init(metadata, orientation, panelHeight, instanceId);
}

MyApplet.prototype = {
    __proto__: Applet.TextApplet.prototype,

    _init: function(metadata, orientation, panelHeight, instanceId) {
        Applet.TextApplet.prototype._init.call(this, orientation, panelHeight, instanceId);

        this.messages = [
            "Drink water 💧",
            "Text a friend 🫶",
            "Take a deep breath 🌬️",
            "Look outside 👀",
            "Get up and stretch 🧘",
            "Rest your eyes 👁️👁️",
            "Respond to a friend 🗣️",
            "Look at some nature 🪴",
            "Trouble? Ask for help 👥",
            "Take your medication 💊",
            "Play calming music 🎶",
            "Remember something nice 🧠",
            "Take a break from social media 📱",
            "Check your posture 🪑",
            "Refill your bottle 💦",
            "Review to-do list 📋",
            "Clean your workspace 🧹",
            "Stand up for a minute 🚶",
            "Do 10 slow breaths 🫁",
            "Plan your next meal 🍲",
            "Stretch hands and wrists ✋",
            "Do that you've postponed 🔄",
            "Unclutter your desktop 🗂️",
            "Is your phone charging? 🔌",
            "Note one thing you finished ✅",
            "Go outside 🌳",
            "Tidy one small thing 🧽",
            "Body check! Tense? Relax 🧘",
            "Look at something far away 👀",
            "Stretch your neck and shoulders 🦴",
            "Smile at yourself 😊",
            "Tea break? 🍵",
            "Listen to birds 🐦",
            "Walk barefoot 👣",
            "Sip slowly ☕",
            "Daydream a little 🌈",
            "Massage your temples 🤲",
            "Sniff fresh air 👃",
            "Adjust your seat 🪑",
            "Roll your ankles 🦶",
            "Think of a joke 😂",
            "Water a plant 🪴",
            "Exhale fully 🫁",
            "Recall a win 🏆",
            "Fluff your pillow 🛏️",
            "Look up clouds ☁️",
            "Rotate your wrists 🔄",
            "Send a meme 😄",
            "Hydrate again 💧",
            "Shake out tension 🤝",
            "Name 3 colors 🌈",
            "Touch something soft 🧶",
            "Plan a treat 🎉",
            "Blink 10 times 👀",
            "Say 'I got this' 💪",
            "Clear one To Do 📑",
            "Smell a fruit 🍊",
            "Loosen your jaw 😗",
            "Count to 5 slowly 🔢",
            "Fix your hair 👋",
            "Whisper thanks 🙏",
            "Imagine ocean waves 🌊",
            "Flex your toes 🦶",
            "Read one page 📖",
            "Arch your back 🐱",
            "Remember that song 🎤",
            "Roll shoulders back 🤷",
            "Think kind thoughts ❤️",
            "Breathe in calm 🌿",
            "Organize one drawer 📥",
            "Look at stars ✨",
            "Stretch your fingers ✋",
            "Remember to blink 👁️",
            "Coffee break? 🫖",
            "Close eyes 10s 🌙",
            "List one goal 🎯",
            "Smell coffee ☕",
            "Name a strength 💥",
            "Open curtains ☀️",
            "Massage your ears 👂",
            "Think of home 🏡",
            "Step outside 🚪",
            "Rub your hands 🤲",
            "Recall laughter 😆",
            "Maybe lower volume? 🔉",
            "Look left-right 👀",
            "Plan a nap 😴",
            "Touch your nose 👃",
            "Write a note 📝",
            "Check the sky 🌌",
            "Loosen grip ✊",
            "Think of friends 👯",
            "Stand tall 🦒",
            "Recall a hug 🤗",
            "Dim the screen? 📱",
            "Stretch your calves 🦵",
            "Name one joy 😊",
            "Sip mindfully 🥤",
            "Think peaceful 🕊️",
            "Check heartbeat ❤️",
            "Roll your eyes 👀",
            "Plan tomorrow 🗓️",
            "Whistle softly 🎵",
            "Feel your feet 👣",
            "Smile inside 😌",
            "Clear one email 📧",
            "Look at green 🟩",
            "Relax your knees 🦵",
            "Think of love 💕",
            "Hum a tune 🎶",
            "Adjust lighting 💡",
            "Count blessings 🙌"
        ];

        this.lastIndex = -1;
        this.setRandomMessage();
        this.startTimer();
    },

    startTimer: function() {
        /* Use 5 seconds for testing, 600 for 10 minutes */
        this.timer = Mainloop.timeout_add_seconds(300, () => {
            this.setRandomMessage();
            return true;
        });
    },

    setRandomMessage: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.messages.length);
        } while (newIndex === this.lastIndex && this.messages.length > 1);

        this.lastIndex = newIndex;
        this.set_applet_label(this.messages[newIndex]);
    },

    on_applet_removed_from_panel: function() {
        if (this.timer) {
            Mainloop.source_remove(this.timer);
            this.timer = null;
        }
    }
};

function main(metadata, orientation, panelHeight, instanceId) {
    return new MyApplet(metadata, orientation, panelHeight, instanceId);
}

