// =========================================================
// ONLINE VOTING SYSTEM - BEGINNER JAVASCRIPT
// =========================================================

// ---------------- LANGUAGE ----------------
const translations = {
    en: {
        gov: "Government of India | Online Voting Portal",
        home: "Home", services: "Services", about: "About", login: "Login",
        initiative: "DIGITAL VOTING INITIATIVE",
        heroTitle: "Your Vote.<br>Your Choice.<br>Your Voice.",
        heroText: "A simple academic demonstration of an online voting process using HTML, CSS, JavaScript and Local Storage.",
        register: "Register to Vote", electionInfo: "ELECTION INFORMATION", studentElection: "Student Council Election",
        votingOpen: "● Voting Open", registration: "Registration:", voting: "Voting:", servicesTitle: "Online Election Services",
        registrationCard: "Voter Registration", registrationText: "Create an account and register for the academic voting demonstration.", registerArrow: "Register →",
        voteCard: "Cast Your Vote", voteText: "Login and select one participating party to cast your vote.", voteArrow: "Vote →",
        resultCard: "Election Results", resultText: "View the current demonstration vote count after voting.", resultsArrow: "Results →"
    },
    hi: {
        gov: "भारत सरकार | ऑनलाइन मतदान पोर्टल", home: "होम", services: "सेवाएं", about: "परिचय", login: "लॉगिन",
        initiative: "डिजिटल मतदान पहल", heroTitle: "आपका वोट।<br>आपकी पसंद।<br>आपकी आवाज़।",
        heroText: "HTML, CSS, JavaScript और Local Storage का उपयोग करके बनाया गया शैक्षणिक ऑनलाइन मतदान प्रदर्शन।",
        register: "मतदाता पंजीकरण", electionInfo: "चुनाव जानकारी", studentElection: "छात्र परिषद चुनाव", votingOpen: "● मतदान खुला है",
        registration: "पंजीकरण:", voting: "मतदान:", servicesTitle: "ऑनलाइन चुनाव सेवाएं", registrationCard: "मतदाता पंजीकरण",
        registrationText: "शैक्षणिक मतदान प्रदर्शन के लिए अपना खाता बनाएं।", registerArrow: "पंजीकरण →", voteCard: "अपना वोट दें",
        voteText: "लॉगिन करें और अपना पसंदीदा दल चुनें।", voteArrow: "मतदान →", resultCard: "चुनाव परिणाम",
        resultText: "मतदान के बाद वर्तमान प्रदर्शन परिणाम देखें।", resultsArrow: "परिणाम →"
    },
    te: {
        gov: "భారత ప్రభుత్వం | ఆన్‌లైన్ ఓటింగ్ పోర్టల్", home: "హోమ్", services: "సేవలు", about: "గురించి", login: "లాగిన్",
        initiative: "డిజిటల్ ఓటింగ్ కార్యక్రమం", heroTitle: "మీ ఓటు.<br>మీ ఎంపిక.<br>మీ స్వరం.",
        heroText: "HTML, CSS, JavaScript మరియు Local Storage ఉపయోగించి రూపొందించిన విద్యా ఆన్‌లైన్ ఓటింగ్ డెమో.",
        register: "ఓటరు నమోదు", electionInfo: "ఎన్నికల సమాచారం", studentElection: "విద్యార్థి మండలి ఎన్నిక", votingOpen: "● ఓటింగ్ తెరిచి ఉంది",
        registration: "నమోదు:", voting: "ఓటింగ్:", servicesTitle: "ఆన్‌లైన్ ఎన్నికల సేవలు", registrationCard: "ఓటరు నమోదు",
        registrationText: "విద్యా ఓటింగ్ డెమో కోసం ఖాతాను సృష్టించండి.", registerArrow: "నమోదు →", voteCard: "మీ ఓటు వేయండి",
        voteText: "లాగిన్ చేసి ఒక పార్టీని ఎంచుకోండి.", voteArrow: "ఓటు →", resultCard: "ఎన్నికల ఫలితాలు",
        resultText: "ఓటింగ్ తర్వాత ప్రస్తుత డెమో ఫలితాలను చూడండి.", resultsArrow: "ఫలితాలు →"
    }
};

function changeLanguage(language) {
    const data = translations[language] || translations.en;
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
        const key = element.getAttribute("data-i18n");
        if (data[key]) element.innerHTML = data[key];
    });
    localStorage.setItem("language", language);
}

const languageSelect = document.getElementById("languageSelect");
if (languageSelect) {
    const savedLanguage = localStorage.getItem("language") || "en";
    languageSelect.value = savedLanguage;
    changeLanguage(savedLanguage);
    languageSelect.addEventListener("change", function () {
        changeLanguage(this.value);
    });
}

// ---------------- SIGNUP ----------------
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = { name, email, password };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.removeItem("hasVoted");
        alert("Account created successfully!");
        window.location.href = "login.html";
    });
}

// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            alert("No user account found. Please sign up first.");
            return;
        }

        const user = JSON.parse(savedUser);
        if (email === user.email && password === user.password) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("currentRole", "user");
            alert("User login successful!");
            window.location.href = "dashboard.html";
        } else {
            alert("Incorrect user email or password.");
        }
    });
}

// ---------------- ADMIN LOGIN ----------------
const adminLoginForm = document.getElementById("adminLoginForm");
if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("adminEmail").value.trim();
        const password = document.getElementById("adminPassword").value;

        // Academic demo credentials only.
        if (email === "admin@election.gov.in" && password === "admin123") {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("currentRole", "admin");
            alert("Admin login successful!");
            window.location.href = "admin.html";
        } else {
            alert("Invalid admin credentials.");
        }
    });
}

// ---------------- LOGIN MODE SWITCH ----------------
const modeButtons = document.querySelectorAll(".mode-btn");
const userLoginPanel = document.getElementById("userLoginPanel");
const adminLoginPanel = document.getElementById("adminLoginPanel");
modeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        modeButtons.forEach(function (btn) { btn.classList.remove("active"); });
        button.classList.add("active");
        const mode = button.getAttribute("data-mode");
        if (userLoginPanel) userLoginPanel.classList.toggle("hidden", mode !== "user");
        if (adminLoginPanel) adminLoginPanel.classList.toggle("hidden", mode !== "admin");
    });
});

// ---------------- ROLE PROTECTION ----------------
function requireRole(role, pageName) {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const currentRole = localStorage.getItem("currentRole");
    if (!loggedIn || currentRole !== role) {
        alert("Please login with the correct access mode.");
        window.location.href = pageName || "login.html";
        return false;
    }
    return true;
}

if (document.querySelector(".admin-page")) {
    requireRole("admin", "login.html");
}

if (document.querySelector(".dashboard") && !document.querySelector(".admin-page")) {
    requireRole("user", "login.html");
}

// ---------------- DASHBOARD NAME ----------------
const welcomeName = document.getElementById("welcomeName");
if (welcomeName) {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
        const user = JSON.parse(savedUser);
        welcomeName.textContent = "Welcome, " + user.name;
    }
}

// ---------------- LOGOUT ----------------
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentRole");
        window.location.href = "index.html";
    });
}

// ---------------- VOTE ----------------
const voteForm = document.getElementById("voteForm");
if (voteForm) {
    if (!requireRole("user", "login.html")) {
        // Stop further interaction when the page is opened directly.
    }

    voteForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (localStorage.getItem("votingOpen") === "false") {
            alert("Voting is currently closed by the administrator.");
            return;
        }

        const selected = document.querySelector('input[name="candidate"]:checked');

        if (!selected) {
            alert("Please select a party.");
            return;
        }

        if (localStorage.getItem("hasVoted") === "true") {
            alert("You have already voted in this demo.");
            return;
        }

        const votes = JSON.parse(localStorage.getItem("votes")) || {
            "Bharatiya Janata Party": 0,
            "Indian National Congress": 0,
            "Aam Aadmi Party": 0,
            "Bahujan Samaj Party": 0
        };

        votes[selected.value] = (votes[selected.value] || 0) + 1;
        localStorage.setItem("votes", JSON.stringify(votes));
        localStorage.setItem("hasVoted", "true");
        alert("Your vote has been submitted successfully!");
        window.location.href = "result.html";
    });
}

// ---------------- RESULTS ----------------
const resultMap = [
    ["Bharatiya Janata Party", "bjpVotes", "bjpBar"],
    ["Indian National Congress", "incVotes", "incBar"],
    ["Aam Aadmi Party", "aapVotes", "aapBar"],
    ["Bahujan Samaj Party", "bspVotes", "bspBar"]
];

const votes = JSON.parse(localStorage.getItem("votes")) || {
    "Bharatiya Janata Party": 0,
    "Indian National Congress": 0,
    "Aam Aadmi Party": 0,
    "Bahujan Samaj Party": 0
};

const totalVotes = Object.values(votes).reduce(function (sum, value) { return sum + value; }, 0);
resultMap.forEach(function (item) {
    const value = votes[item[0]] || 0;
    const voteElement = document.getElementById(item[1]);
    const barElement = document.getElementById(item[2]);
    if (voteElement) voteElement.textContent = value + (value === 1 ? " vote" : " votes");
    if (barElement) barElement.style.width = totalVotes ? ((value / totalVotes) * 100) + "%" : "0%";
});

// =========================================================
// PARTY INFORMATION POPUP
// =========================================================

const partyInformation = {
    bjp: {
        name: "Bharatiya Janata Party",
        short: "BJP",
        logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lotus_flower_symbol.svg",
        leaders: [
            ["Nitin Nabin", "National President"],
            ["Narendra Modi", "Prime Minister & senior BJP leader"],
            ["Amit Shah", "Senior BJP leader & Union Minister"],
            ["Rajnath Singh", "Senior BJP leader & Union Minister"]
        ],
        wins: [
            ["2014", "282 Lok Sabha seats"],
            ["2019", "303 Lok Sabha seats"],
            ["2024", "240 Lok Sabha seats"]
        ]
    },

    inc: {
        name: "Indian National Congress",
        short: "INC",
        logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hand_INC.svg",
        leaders: [
            ["Mallikarjun Kharge", "Congress President"],
            ["Rahul Gandhi", "Leader of Opposition, Lok Sabha"],
            ["K. C. Venugopal", "AICC General Secretary (Organisation)"],
            ["Sonia Gandhi", "Senior Congress leader"]
        ],
        wins: [
            ["2014", "44 Lok Sabha seats"],
            ["2019", "52 Lok Sabha seats"],
            ["2024", "99 Lok Sabha seats"]
        ]
    },

    aap: {
        name: "Aam Aadmi Party",
        short: "AAP",
        logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/AAP_symbol.svg",
        leaders: [
            ["Arvind Kejriwal", "National Convenor"],
            ["Pankaj Gupta", "National Secretary"],
            ["N. D. Gupta", "National Treasurer"],
            ["Bhagwant Mann", "Senior AAP leader & Punjab Chief Minister"]
        ],
        wins: [
            ["2015", "67 of 70 Delhi Assembly seats"],
            ["2020", "62 of 70 Delhi Assembly seats"],
            ["2024", "3 Lok Sabha seats"]
        ]
    },

    bsp: {
        name: "Bahujan Samaj Party",
        short: "BSP",
        logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Elephant_Bahujan_Samaj_Party.svg",
        leaders: [
            ["Mayawati", "National President"],
            ["Ramji Gautam", "Senior BSP leader & Rajya Sabha member"],
            ["Vishwanath Pal", "Senior party office-bearer"],
            ["Munquad Ali", "Senior party office-bearer"]
        ],
        wins: [
            ["2009", "21 Lok Sabha seats"],
            ["2019", "10 Lok Sabha seats"],
            ["2024", "No Lok Sabha seats won"]
        ]
    }
};

const partyCards = document.querySelectorAll(".party-card[data-party]");
const partyModal = document.getElementById("partyModal");
const closePartyModal = document.getElementById("closePartyModal");
const closePartyButton = document.getElementById("closePartyButton");
const selectPartyButton = document.getElementById("selectPartyButton");

let openedParty = null;

function showPartyInformation(partyKey) {
    const party = partyInformation[partyKey];
    if (!party || !partyModal) return;

    openedParty = partyKey;

    document.getElementById("modalPartyName").textContent = party.name;
    document.getElementById("modalShortName").textContent = party.short;

    const modalLogo = document.getElementById("modalLogo");
    modalLogo.src = party.logo;
    modalLogo.onerror = function () {
        this.src = "images/" + partyKey + "-symbol.svg";
    };

    const leadersContainer = document.getElementById("modalLeaders");
    leadersContainer.innerHTML = "";

    party.leaders.forEach(function (leader) {
        const card = document.createElement("div");
        card.className = "leader-card";
        card.innerHTML = "<strong>" + leader[0] + "</strong><span>" + leader[1] + "</span>";
        leadersContainer.appendChild(card);
    });

    const winsContainer = document.getElementById("modalWins");
    winsContainer.innerHTML = "";

    party.wins.forEach(function (win) {
        const card = document.createElement("div");
        card.className = "win-card";
        card.innerHTML = "<strong>" + win[0] + "</strong><span>" + win[1] + "</span>";
        winsContainer.appendChild(card);
    });

    partyModal.classList.add("show");
    partyModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function hidePartyInformation() {
    if (!partyModal) return;

    partyModal.classList.remove("show");
    partyModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

partyCards.forEach(function (card) {
    card.addEventListener("click", function (event) {
        const partyKey = card.getAttribute("data-party");
        const radio = card.querySelector('input[type="radio"]');

        if (radio) {
            radio.checked = true;
        }

        showPartyInformation(partyKey);
    });
});

if (closePartyModal) {
    closePartyModal.addEventListener("click", hidePartyInformation);
}

if (closePartyButton) {
    closePartyButton.addEventListener("click", hidePartyInformation);
}

if (selectPartyButton) {
    selectPartyButton.addEventListener("click", function () {
        const radio = document.querySelector('.party-card[data-party="' + openedParty + '"] input[type="radio"]');
        if (radio) radio.checked = true;
        hidePartyInformation();
    });
}

if (partyModal) {
    partyModal.addEventListener("click", function (event) {
        if (event.target === partyModal) {
            hidePartyInformation();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        hidePartyInformation();
    }
});

/* =========================================================
   SMOOTH UI ENHANCEMENTS
   ========================================================= */

// Add scroll-reveal animation to important sections/cards.
const animatedItems = document.querySelectorAll(
    ".service-card, .about, .dash-card, .info-strip, .notice, .party-card, .results-card, .vote-notice"
);

animatedItems.forEach(function (item, index) {
    item.classList.add("reveal-on-scroll");
    item.style.transitionDelay = Math.min(index * 60, 360) + "ms";
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    animatedItems.forEach(function (item) {
        revealObserver.observe(item);
    });
} else {
    animatedItems.forEach(function (item) {
        item.classList.add("visible");
    });
}

// Smooth page transition when opening another local HTML page.
document.querySelectorAll("a[href$='.html']").forEach(function (link) {
    link.addEventListener("click", function (event) {
        const target = link.getAttribute("href");

        if (!target || target.startsWith("#") || link.target === "_blank") {
            return;
        }

        event.preventDefault();

        document.body.style.transition = "opacity .18s ease, transform .18s ease";
        document.body.style.opacity = "0";
        document.body.style.transform = "translateY(6px)";

        setTimeout(function () {
            window.location.href = target;
        }, 180);
    });
});

// =========================================================
// ADMIN DASHBOARD
// =========================================================

function getVotes() {
    return JSON.parse(localStorage.getItem("votes")) || {
        "Bharatiya Janata Party": 0,
        "Indian National Congress": 0,
        "Aam Aadmi Party": 0,
        "Bahujan Samaj Party": 0
    };
}

function updateAdminDashboard() {
    const votes = getVotes();
    const values = Object.values(votes);
    const total = values.reduce(function (sum, value) { return sum + value; }, 0);
    const voterCount = localStorage.getItem("user") ? 1 : 0;
    const isOpen = localStorage.getItem("votingOpen") !== "false";

    const totalEl = document.getElementById("adminTotalVotes");
    const voterEl = document.getElementById("adminVoterCount");
    const statusEl = document.getElementById("adminVotingStatus");
    const leaderEl = document.getElementById("adminLeader");
    const badge = document.getElementById("statusBadge");
    const toggle = document.getElementById("toggleVoting");

    if (totalEl) totalEl.textContent = total;
    if (voterEl) voterEl.textContent = voterCount;
    if (statusEl) statusEl.textContent = isOpen ? "Open" : "Closed";

    let leader = "—";
    if (total > 0) {
        leader = Object.keys(votes).sort(function (a, b) { return votes[b] - votes[a]; })[0];
    }
    if (leaderEl) leaderEl.textContent = leader === "Bharatiya Janata Party" ? "BJP" : leader === "Indian National Congress" ? "INC" : leader === "Aam Aadmi Party" ? "AAP" : leader === "Bahujan Samaj Party" ? "BSP" : leader;

    if (badge) {
        badge.textContent = isOpen ? "OPEN" : "CLOSED";
        badge.classList.toggle("open", isOpen);
        badge.classList.toggle("closed", !isOpen);
    }
    if (toggle) toggle.textContent = isOpen ? "Close Voting" : "Open Voting";

    const rows = document.getElementById("adminPartyRows");
    if (rows) {
        const shortNames = {
            "Bharatiya Janata Party": "BJP",
            "Indian National Congress": "INC",
            "Aam Aadmi Party": "AAP",
            "Bahujan Samaj Party": "BSP"
        };
        rows.innerHTML = "";
        Object.keys(votes).forEach(function (party) {
            const percent = total ? Math.round((votes[party] / total) * 100) : 0;
            const row = document.createElement("div");
            row.className = "admin-party-row";
            row.innerHTML = "<div><strong>" + shortNames[party] + "</strong><span>" + party + "</span></div><b>" + votes[party] + " votes</b><div class="admin-mini-bar"><span style="width:" + percent + "%"></span></div>";
            rows.appendChild(row);
        });
    }
}

const toggleVoting = document.getElementById("toggleVoting");
if (toggleVoting) {
    if (localStorage.getItem("votingOpen") === null) localStorage.setItem("votingOpen", "true");
    toggleVoting.addEventListener("click", function () {
        const currentlyOpen = localStorage.getItem("votingOpen") !== "false";
        localStorage.setItem("votingOpen", currentlyOpen ? "false" : "true");
        updateAdminDashboard();
    });
}

const resetElection = document.getElementById("resetElection");
if (resetElection) {
    resetElection.addEventListener("click", function () {
        const confirmed = confirm("Reset all demo votes and voter status? This cannot be undone.");
        if (!confirmed) return;
        localStorage.removeItem("votes");
        localStorage.removeItem("hasVoted");
        localStorage.setItem("votingOpen", "true");
        alert("Election demonstration data has been reset.");
        updateAdminDashboard();
    });
}

const adminLogout = document.getElementById("adminLogout");
if (adminLogout) {
    adminLogout.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentRole");
        window.location.href = "index.html";
    });
}

if (document.querySelector(".admin-page")) {
    updateAdminDashboard();
}

// Keep voting button state visible when voting is closed.
if (voteForm && localStorage.getItem("votingOpen") === "false") {
    const submitButton = voteForm.querySelector("button[type='submit']");
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Voting Closed";
    }
}
