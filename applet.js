const Applet = imports.ui.applet;
const St = imports.gi.St;
const Mainloop = imports.mainloop;
const Gio = imports.gi.Gio;

function MyApplet(metadata, orientation, panelHeight, instanceId) {
    this._init(metadata, orientation, panelHeight, instanceId);
}

MyApplet.prototype = {
    __proto__: Applet.TextApplet.prototype,

    _init: function(metadata, orientation, panelHeight, instanceId) {
        Applet.TextApplet.prototype._init.call(this, orientation, panelHeight, instanceId);

        let messagesFile = Gio.file_new_for_path(metadata.path + "/messages.json");

        let [success, data] = messagesFile.load_contents(null);

        if (!success) {
            this.messages = ["Error loading messages"];
        } else {
            try {
                this.messages = JSON.parse(data.toString());
            } catch (e) {
                this.messages = ["Invalid JSON"];
            }
        }

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

    on_applet_clicked: function(event) {
        this.setRandomMessage();
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

