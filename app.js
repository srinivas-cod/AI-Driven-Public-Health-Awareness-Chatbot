const config = {
    languages: ['en', 'ta', 'hi'],
    emergencyKeywords: ['chest pain', 'breathing difficulty', 'cannot breathe', 'heart attack', 'stroke', 'unconscious', 'severe bleeding', 'suicide', 'self harm'],
    mockShops: [
        { name: "City Pharma 24/7", address: "Main Bazaar, 1st Cross", distance: "0.5 km", status: "Open" },
        { name: "Apollo Pharmacy", address: "Near Railway Station", distance: "1.2 km", status: "Open" },
        { name: "Ganesh Medical Store", address: "Kamaraj Road", distance: "1.8 km", status: "Closing Soon" },
        { name: "MedPlus Wellness", address: "Anna Nagar East", distance: "2.5 km", status: "Open" }
    ]
};

const translations = {
    en: {
        welcome: "Hello! 👋 I am your VitalPath Health Assistant.",
        hint: "Type your symptoms (e.g., 'fever', 'stomach ache') or ask about medicine shops.",
        causes: "🩺 Possible Causes:",
        prevention: "🛡 Preventive Measures:",
        warnings: "⚠ Warning Signs:",
        emergency: "🚨 EMERGENCY ALERT: Please visit the nearest hospital immediately.",
        no_match: "I couldn't find a direct match. Please describe your symptoms in more detail.",
        placeholder: "Type symptoms here...",
        shop_title: "Nearby Medical Shops"
    },
    ta: {
        welcome: "வணக்கம்! 👋 நான் உங்கள் VitalPath சுகாதார உதவியாளர்.",
        hint: "உங்கள் அறிகுறிகளைத் தட்டச்சு செய்யவும் (எ.கா., 'காய்ச்சல்', 'வயிற்று வலி').",
        causes: "🩺 சாத்தியமான காரணங்கள்:",
        prevention: "🛡 தடுப்பு முறைகள்:",
        warnings: "⚠ எச்சரிக்கை அறிகுறிகள்:",
        emergency: "🚨 அவசர எச்சரிக்கை: தயவுசெய்து உடனடியாக அருகிலுள்ள மருத்துவமனைக்குச் செல்லுங்கள்.",
        no_match: "நேரடிப் பொருத்தத்தைக் கண்டுபிடிக்க முடியவில்லை. உங்கள் அறிகுறிகளை விரிவாக விவரிக்கவும்.",
        placeholder: "அறிகுறிகளை இங்கே தட்டச்சு செய்யவும்...",
        shop_title: "அருகிலுள்ள மருந்து கடைகள்"
    },
    hi: {
        welcome: "नमस्ते! 👋 मैं आपका VitalPath स्वास्थ्य सहायक हूँ।",
        hint: "अपने लक्षण लिखें (जैसे, 'बुखार', 'पेट दर्द') या दवा की दुकानों के बारे में पूछें।",
        causes: "🩺 संभावित कारण:",
        prevention: "🛡 निवारक उपाय:",
        warnings: "⚠ चेतावनी संकेत:",
        emergency: "🚨 आपातकालीन चेतावनी: कृपया तुरंत निकटतम अस्पताल जाएं।",
        no_match: "मुझे कोई सीधा मिलान नहीं मिला। कृपया अपने लक्षणों का अधिक विस्तार से वर्णन करें।",
        placeholder: "यहाँ लक्षण लिखें...",
        shop_title: "पास की मेडिकल दुकानें"
    }
};

const medicalDatabase = [
    {
        keywords: ['fever', 'cough', 'cold', 'sneeze', 'nasal', 'throat', 'காய்ச்சல்', 'இருமல்', 'சளி', 'बुखार', 'खांसी'],
        name: { en: 'Viral Fever / Common Cold', ta: 'வைரஸ் காய்ச்சல் / சளி', hi: 'वायरल फीवर / सामान्य सर्दी' },
        prevention: {
            en: ['Drink warm fluids', 'Complete bed rest', 'Warm saline gargle'],
            ta: ['வெதுவெதுப்பான நீர் குடிக்கவும்', 'முழு ஓய்வு எடுக்கவும்', 'உப்பு நீர் கொப்பளிக்கவும்'],
            hi: ['गुनगुना पानी पिएं', 'पूरी तरह आराम करें', 'नमक के पानी से गरारे करें']
        },
        warnings: {
            en: ['Fever above 103°F', 'Difficulty breathing'],
            ta: ['103°F-க்கு மேல் காய்ச்சல்', 'மூச்சு விடுவதில் சிரமம்'],
            hi: ['103°F से अधिक बुखार', 'सांस लेने में तकलीफ']
        }
    },
    {
        keywords: ['stomach', 'pain', 'diarrhea', 'vomit', 'nausea', 'வயிற்று வலி', 'வாந்தி', 'पेट दर्द', 'उल्टी'],
        name: { en: 'Gastrointestinal Infection', ta: 'வயிற்று தொற்று', hi: 'पेट का संक्रमण' },
        prevention: {
            en: ['Drink ORS/Electrolytes', 'Eat bland food (Rice/Bananas)', 'Boil drinking water'],
            ta: ['ORS கரைசல் குடிக்கவும்', 'எளிமையான உணவு உண்ணவும்', 'தண்ணீரை காய்ச்சி குடிக்கவும்'],
            hi: ['ओआरएस घोल पिएं', 'सादा भोजन खाएं', 'उबला हुआ पानी पिएं']
        },
        warnings: {
            en: ['Blood in stool', 'Severe abdominal cramps', 'Inability to keep fluids down'],
            ta: ['மலத்தில் இரத்தம்', 'கடுமையான வயிற்று வலி', 'தண்ணீர் கூட குடிக்க முடியாமை'],
            hi: ['मल में खून आना', 'पेट में तेज ऐंठन', 'तरल पदार्थ भी न पच पाना']
        }
    },
    {
        keywords: ['headache', 'head', 'migraine', 'dizzy', 'தலைவலி', 'தலைச்சுற்றல்', 'सिरदर्द', 'चक्कर'],
        name: { en: 'Tension Headache / Dehydration', ta: 'தலைவலி / நீர்ச்சத்து குறைபாடு', hi: 'सिरदर्द / निर्जलीकरण' },
        prevention: {
            en: ['Hydrate with plenty of water', 'Rest in a quiet, dark room', 'Massage neck and temples'],
            ta: ['நிறைய தண்ணீர் குடிக்கவும்', 'அமைதியான அறையில் ஓய்வெடுக்கவும்', 'கழுத்து மற்றும் தலையை மசாஜ் செய்யவும்'],
            hi: ['खूब पानी पिएं', 'शांत, अंधेरे कमरे में आराम करें', 'गर्दन और सिर की मालिश करें']
        },
        warnings: {
            en: ['Sudden severe headache', 'Vision changes', 'Confusion or numbness'],
            ta: ['திடீர் கடுமையான தலைவலி', 'பார்வையில் மாற்றம்', 'குழப்பம் அல்லது உணர்வற்ற நிலை'],
            hi: ['अचानक तेज सिरदर्द', 'दृष्टि में बदलाव', 'भ्रम या सुन्न होना']
        }
    }
];

class HealthApp {
    constructor() {
        this.user = { phone: '', age: '', gender: '', location: '', lang: 'en' };
        this.init();
    }

    init() {
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');

        if (sendBtn) sendBtn.addEventListener('click', () => this.handleChat());
        if (userInput) {
            userInput.addEventListener('input', () => {
                userInput.style.height = 'auto';
                userInput.style.height = userInput.scrollHeight + 'px';
            });
            userInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleChat();
                }
            });
        }
    }

    showScreen(screenId) {
        ['landingPage', 'authScreen', 'profileScreen', 'appWrapper'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });
        document.getElementById(screenId).classList.remove('hidden');
    }

    login() {
        const phone = document.getElementById('userPhone').value;
        if (phone.length < 10) { alert("Please enter a valid 10-digit phone number."); return; }
        this.user.phone = phone;
        this.showScreen('profileScreen');
    }

    detectLocation() {
        const locInput = document.getElementById('userLocation');
        locInput.value = "Detecting...";
        setTimeout(() => {
            locInput.value = "Anna Nagar, Chennai";
            this.user.location = "Anna Nagar, Chennai";
        }, 1500);
    }

    finishProfile() {
        this.user.age = document.getElementById('userAge').value;
        this.user.gender = document.getElementById('userGender').value;
        this.user.location = document.getElementById('userLocation').value || "Chennai";

        if (!this.user.age) { alert("Please enter your age."); return; }

        this.showScreen('appWrapper');
        this.setupAppUI();
    }

    setupAppUI() {
        document.getElementById('avatarInitial').innerText = this.user.gender === 'male' ? 'M' : 'F';
        document.getElementById('userLocationDisplay').innerText = this.user.location;
        this.renderShops();
        this.addMessage(translations[this.user.lang].welcome, 'bot');
        this.addMessage(translations[this.user.lang].hint, 'bot');
    }

    changeLanguage() {
        const currentIndex = config.languages.indexOf(this.user.lang);
        const nextIndex = (currentIndex + 1) % config.languages.length;
        this.user.lang = config.languages[nextIndex];

        document.getElementById('langText').innerText =
            this.user.lang === 'en' ? 'English' :
                this.user.lang === 'ta' ? 'தமிழ்' : 'हिन्दी';

        document.getElementById('userInput').placeholder = translations[this.user.lang].placeholder;
        this.addMessage(`Language changed to ${document.getElementById('langText').innerText}`, 'bot');
    }

    renderShops() {
        const list = document.getElementById('shopsList');
        list.innerHTML = config.mockShops.map(shop => `
            <div class="shop-card">
                <h4>${shop.name}</h4>
                <p>${shop.address}</p>
                <p><strong>${shop.distance}</strong></p>
                <span class="tag">${shop.status}</span>
            </div>
        `).join('');
    }

    toggleShops() {
        document.getElementById('shopsPanel').classList.toggle('hidden');
    }

    addMessage(text, sender) {
        const container = document.getElementById('chatMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerHTML = `
            <div class="message-bubble">
                <p>${text}</p>
                <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        `;
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }

    handleChat() {
        const input = document.getElementById('userInput');
        const text = input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        input.value = '';
        input.style.height = 'auto';

        setTimeout(() => this.processInput(text), 800);
    }

    processInput(text) {
        const lowText = text.toLowerCase();
        const t = translations[this.user.lang];

        // 1. Emergency
        if (config.emergencyKeywords.some(kw => lowText.includes(kw))) {
            document.getElementById('emergencyBanner').classList.remove('hidden');
            this.addMessage(t.emergency, 'bot');
            return;
        }

        // 2. Shop query
        if (lowText.includes('shop') || lowText.includes('medicine') || lowText.includes('pharmacy')) {
            this.toggleShops();
            this.addMessage("I've opened the nearby medical shops panel for you.", 'bot');
            return;
        }

        // 3. Diagnosis
        let match = medicalDatabase.find(item => item.keywords.some(kw => lowText.includes(kw)));

        if (match) {
            this.addStructuredResponse(match);
        } else {
            this.addMessage(t.no_match, 'bot');
        }
    }

    addStructuredResponse(match) {
        const t = translations[this.user.lang];
        const lang = this.user.lang;
        const container = document.getElementById('chatMessages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `message bot`;

        msgDiv.innerHTML = `
            <div class="message-bubble">
                <div class="structured-response">
                    <p><strong>${match.name[lang]}</strong></p>
                    
                    <strong>${t.prevention}</strong>
                    <ul>
                        ${match.prevention[lang].map(p => `<li>${p}</li>`).join('')}
                    </ul>

                    <strong>${t.warnings}</strong>
                    <ul>
                        ${match.warnings[lang].map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
                <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        `;
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }
}

const app = new HealthApp();
window.app = app;
