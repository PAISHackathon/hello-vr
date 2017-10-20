<<template>
  <!-- render HAL UI -->
</template>

<script>
import Bus from '../../../bus.js'
import annyang from 'annyang'
import speak from 'browser-speak'

const voice_commands = {
    'signal': {
        'ja-JP': 'command',
        'en-US': 'command'
    }
}

export default {
    props: {
        'language': {
            type: String,
            default: 'en-US',
            validator(value) {
                return value != ''
            }
        }
    },
    data() {
        return {
            voice_idx: 0
        }
    },
    watch: {
        language: function(newVal, oldVal) { // watch it
            installCommands(newVal)
        }
    },
    mounted() {
        this.updateVoiceIndex(this.language);
        this.installCommands(this.language)
    },
    methods: {
        vueSpeak(message) {
            annyang.pause();
            speak(message, this.voice_idx)
            annyang.start();
        },
        updateVoiceIndex(lang) {
            let self = this
            window.speechSynthesis.onvoiceschanged = function() {
                let voices = window.speechSynthesis.getVoices();
                console.log('voices', voices)

                let voice_idx = voices.findIndex(v => {
                    //console.log(v)
                    return v.lang == self.language
                })

                if (voice_idx == -1) {
                    voice_idx = 0
                }

                self.voice_idx = voice_idx
                console.log('voice_index', voice_idx)
            };
        },
        installCommands(lang) {
            let self = this
            annyang.pause();
            let commands = {}
            // install speech command
            if (lang == 'en-US') {
                commands = {
                    'hello': function() {
                        self.vueSpeak('Hi. I am your search assistant.', self.voice_idx);
                    },
                    'help': function() {
                        self.vueSpeak('You can ask me to search for something. ');
                    },
                    'next': function() {
                        Bus.$emit('navigate-next')
                    },
                    'search *keyword': function(keyword) {
                        self.vueSpeak(`Searching: ${keyword}`, self.voice_idx)
                        Bus.$emit('fetchItems', keyword)
                    }
                }
            } else if (lang == 'ja-JP') {
                console.log(this.language)
                commands = {
                    'こんにちは': function() {
                        console.log('konnichiwa')
                        self.vueSpeak('こんにちは', self.voice_idx);
                    },
                    '*keyword 探しましょう': function(keyword) {
                        self.vueSpeak(`${keyword} 探しってます`, self.voice_idx)
                        Bus.$emit('fetchItems', keyword)
                    }
                }

                console.log(commands)
            }

            /*let commands = Object.keys(voice_commands).reduce((res, signal) => {
                let lang = self.language
                if (voice_commands[signal] && voice_commands[signal][lang]) {
                    res[voice_commands[signal][lang]] = function () {
                        Bus.$emit(signal, {lang, arguments})
                    }
                }
            }, {})*/

            annyang.addCommands(commands);
            annyang.setLanguage(lang);

            // Start listening. 
            annyang.start();
        }
    }
}
</script>
