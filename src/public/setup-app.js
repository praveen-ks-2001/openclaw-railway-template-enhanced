
(function () {
  // DOM Elements - Step Navigation
  var steps = document.querySelectorAll('.step');
  var stepContents = document.querySelectorAll('.step-content');
  var stepConnectors = document.querySelectorAll('.step-connector');
  var currentStep = 1;

  // Navigation Buttons
  var nextToStep2 = document.getElementById('nextToStep2');
  var nextToStep3 = document.getElementById('nextToStep3');
  var backToStep1 = document.getElementById('backToStep1');
  var backToStep2 = document.getElementById('backToStep2');

  // Sidebar Toggles
  var toggleConsole = document.getElementById('toggleConsole');
  var consoleSection = document.getElementById('consoleSection');
  var toggleConfig = document.getElementById('toggleConfig');
  var configSection = document.getElementById('configSection');

  // Original elements
  var statusEl = document.getElementById('status');
  var statusDot = document.getElementById('statusDot');
  var authGroupEl = document.getElementById('authGroup');
  var authChoiceEl = document.getElementById('authChoice');
  var logEl = document.getElementById('log');

  // Summary Elements
  var summaryProvider = document.getElementById('summaryProvider');
  var summaryAuth = document.getElementById('summaryAuth');
  var summaryKey = document.getElementById('summaryKey');
  var summaryFlow = document.getElementById('summaryFlow');
  var summaryTelegram = document.getElementById('summaryTelegram');
  var summaryDiscord = document.getElementById('summaryDiscord');
  var summarySlack = document.getElementById('summarySlack');

  // OpenClaw UI Link
  var openClawLink = document.getElementById('openClawLink');

  // Debug console
  var consoleCmdEl = document.getElementById('consoleCmd');
  var consoleArgEl = document.getElementById('consoleArg');
  var consoleRunEl = document.getElementById('consoleRun');
  var consoleOutEl = document.getElementById('consoleOut');

  // Config editor
  var configPathEl = document.getElementById('configPath');
  var configTextEl = document.getElementById('configText');
  var configReloadEl = document.getElementById('configReload');
  var configSaveEl = document.getElementById('configSave');
  var configOutEl = document.getElementById('configOut');

  // Store gateway token
  var gatewayToken = null;

  // Auth groups data
  var authGroups = [];

  // Update Summary Box
  function updateSummary() {
    // Provider
    if (summaryProvider && authGroupEl) {
      var selectedGroup = authGroupEl.options[authGroupEl.selectedIndex];
      summaryProvider.textContent = selectedGroup ? selectedGroup.textContent.split(' - ')[0] : '—';
    }

    // Auth Method
    if (summaryAuth && authChoiceEl) {
      var selectedAuth = authChoiceEl.options[authChoiceEl.selectedIndex];
      summaryAuth.textContent = selectedAuth ? selectedAuth.textContent : '—';
    }

    // API Key (masked)
    if (summaryKey) {
      var keyEl = document.getElementById('authSecret');
      if (keyEl && keyEl.value.trim()) {
        var keyVal = keyEl.value.trim();
        summaryKey.textContent = keyVal.substring(0, 8) + '••••••••';
        summaryKey.classList.remove('disabled');
      } else {
        summaryKey.textContent = 'Not provided';
        summaryKey.classList.add('disabled');
      }
    }

    // Setup Flow
    if (summaryFlow) {
      var flowEl = document.getElementById('flow');
      summaryFlow.textContent = flowEl ? flowEl.options[flowEl.selectedIndex].textContent : '—';
    }

    // Telegram
    if (summaryTelegram) {
      var telegramEl = document.getElementById('telegramToken');
      if (telegramEl && telegramEl.value.trim()) {
        summaryTelegram.textContent = 'Configured';
        summaryTelegram.classList.add('enabled');
        summaryTelegram.classList.remove('disabled');
      } else {
        summaryTelegram.textContent = 'Not configured';
        summaryTelegram.classList.add('disabled');
        summaryTelegram.classList.remove('enabled');
      }
    }

    // Discord
    if (summaryDiscord) {
      var discordEl = document.getElementById('discordToken');
      if (discordEl && discordEl.value.trim()) {
        summaryDiscord.textContent = 'Configured';
        summaryDiscord.classList.add('enabled');
        summaryDiscord.classList.remove('disabled');
      } else {
        summaryDiscord.textContent = 'Not configured';
        summaryDiscord.classList.add('disabled');
        summaryDiscord.classList.remove('enabled');
      }
    }

    // Slack
    if (summarySlack) {
      var slackBotEl = document.getElementById('slackBotToken');
      var slackAppEl = document.getElementById('slackAppToken');
      if ((slackBotEl && slackBotEl.value.trim()) || (slackAppEl && slackAppEl.value.trim())) {
        summarySlack.textContent = 'Configured';
        summarySlack.classList.add('enabled');
        summarySlack.classList.remove('disabled');
      } else {
        summarySlack.textContent = 'Not configured';
        summarySlack.classList.add('disabled');
        summarySlack.classList.remove('enabled');
      }
    }
  }

  // Step Navigation Functions
  function goToStep(stepNumber) {
    currentStep = stepNumber;

    // Update step indicators
    steps.forEach(function (step, index) {
      var stepNum = index + 1;
      step.classList.remove('active', 'completed');

      if (stepNum < currentStep) {
        step.classList.add('completed');
      } else if (stepNum === currentStep) {
        step.classList.add('active');
      }
    });

    // Update connectors
    stepConnectors.forEach(function (connector, index) {
      if (index < currentStep - 1) {
        connector.classList.add('completed');
      } else {
        connector.classList.remove('completed');
      }
    });

    // Show/hide content
    stepContents.forEach(function (content) {
      var contentStep = parseInt(content.getAttribute('data-step'));
      if (contentStep === currentStep) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    // Update summary when entering Step 3
    if (stepNumber === 3) {
      updateSummary();
    }

    // Scroll to top of main container
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Step click navigation
  steps.forEach(function (step) {
    step.addEventListener('click', function () {
      var stepNum = parseInt(step.getAttribute('data-step'));
      goToStep(stepNum);
    });
  });

  // Button navigation
  if (nextToStep2) {
    nextToStep2.addEventListener('click', function () {
      goToStep(2);
    });
  }

  if (nextToStep3) {
    nextToStep3.addEventListener('click', function () {
      goToStep(3);
    });
  }

  if (backToStep1) {
    backToStep1.addEventListener('click', function () {
      goToStep(1);
    });
  }

  if (backToStep2) {
    backToStep2.addEventListener('click', function () {
      goToStep(2);
    });
  }

  // Toggle functions for sidebar
  function setupToggle(toggleEl, sectionEl) {
    if (toggleEl && sectionEl) {
      toggleEl.addEventListener('click', function () {
        toggleEl.classList.toggle('open');
        sectionEl.classList.toggle('open');
      });
    }
  }

  setupToggle(toggleConsole, consoleSection);
  setupToggle(toggleConfig, configSection);

  // Status Functions
  function setStatus(s, isConfigured, isLoading) {
    if (statusEl) statusEl.textContent = s;
    if (statusDot) {
      statusDot.classList.remove('configured', 'loading');
      if (isLoading) {
        statusDot.classList.add('loading');
      } else if (isConfigured) {
        statusDot.classList.add('configured');
      }
    }
  }

  function renderAuth(groups) {
    authGroups = groups;
    if (!authGroupEl) return;

    authGroupEl.innerHTML = '';
    for (var i = 0; i < groups.length; i++) {
      var g = groups[i];
      var opt = document.createElement('option');
      opt.value = g.value;
      opt.textContent = g.label + (g.hint ? ' - ' + g.hint : '');
      authGroupEl.appendChild(opt);
    }

    authGroupEl.onchange = function () {
      var sel = null;
      for (var j = 0; j < groups.length; j++) {
        if (groups[j].value === authGroupEl.value) sel = groups[j];
      }
      if (authChoiceEl) {
        authChoiceEl.innerHTML = '';
        var opts = (sel && sel.options) ? sel.options : [];
        for (var k = 0; k < opts.length; k++) {
          var o = opts[k];
          var opt2 = document.createElement('option');
          opt2.value = o.value;
          opt2.textContent = o.label + (o.hint ? ' - ' + o.hint : '');
          authChoiceEl.appendChild(opt2);
        }
      }
    };

    authGroupEl.onchange();
  }

  function httpJson(url, opts) {
    opts = opts || {};
    opts.credentials = 'same-origin';
    return fetch(url, opts).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) {
          throw new Error('HTTP ' + res.status + ': ' + (t || res.statusText));
        });
      }
      return res.json();
    });
  }

  function updateOpenClawLink() {
    if (openClawLink && gatewayToken) {
      openClawLink.href = '/openclaw?token=' + encodeURIComponent(gatewayToken);
    }
  }

  function refreshStatus() {
    setStatus('Initializing engine...', false, true);
    return httpJson('/setup/api/status').then(function (j) {
      var ver = j.openclawVersion ? (' | ' + j.openclawVersion) : '';
      var isConfigured = j.configured;
      var statusText = isConfigured ? 'Configured' : 'Not configured';
      setStatus(statusText + ver, isConfigured, false);
      renderAuth(j.authGroups || []);

      // Store gateway token and update link
      if (j.gatewayToken) {
        gatewayToken = j.gatewayToken;
        updateOpenClawLink();
      }

      if (j.channelsAddHelp && j.channelsAddHelp.indexOf('telegram') === -1) {
        if (logEl) logEl.textContent += '\nNote: this openclaw build does not list telegram in `channels add --help`. Telegram auto-add will be skipped.\n';
      }

      // Attempt to load config editor content if present.
      if (configReloadEl && configTextEl) {
        loadConfigRaw();
      }

    }).catch(function (e) {
      setStatus('Error: ' + String(e), false, false);
    });
  }

  // Run Setup
  var runBtn = document.getElementById('run');
  if (runBtn) {
    runBtn.onclick = function () {
      var payload = {
        flow: document.getElementById('flow').value,
        authChoice: authChoiceEl ? authChoiceEl.value : '',
        authSecret: document.getElementById('authSecret').value,
        telegramToken: document.getElementById('telegramToken').value,
        discordToken: document.getElementById('discordToken').value,
        slackBotToken: document.getElementById('slackBotToken').value,
        slackAppToken: document.getElementById('slackAppToken').value
      };

      if (logEl) logEl.textContent = 'Running setup... This may take up to 30 seconds...\n';

      fetch('/setup/api/run', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        return res.text();
      }).then(function (text) {
        var j;
        try { j = JSON.parse(text); } catch (_e) { j = { ok: false, output: text }; }
        if (logEl) logEl.textContent += (j.output || JSON.stringify(j, null, 2));
        return refreshStatus();
      }).catch(function (e) {
        if (logEl) logEl.textContent += '\nError: ' + String(e) + '\n';
      });
    };
  }

  // Pairing approve helper
  var pairingBtn = document.getElementById('pairingApprove');
  if (pairingBtn) {
    pairingBtn.onclick = function () {
      var channel = prompt('Enter channel (telegram or discord):');
      if (!channel) return;
      channel = channel.trim().toLowerCase();
      if (channel !== 'telegram' && channel !== 'discord') {
        alert('Channel must be "telegram" or "discord"');
        return;
      }
      var code = prompt('Enter pairing code (e.g. 3EY4PUYS):');
      if (!code) return;
      if (logEl) logEl.textContent += '\nApproving pairing for ' + channel + '...\n';
      fetch('/setup/api/pairing/approve', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ channel: channel, code: code.trim() })
      }).then(function (r) { return r.text(); })
        .then(function (t) { if (logEl) logEl.textContent += t + '\n'; })
        .catch(function (e) { if (logEl) logEl.textContent += 'Error: ' + String(e) + '\n'; });
    };
  }

  // Reset
  var resetBtn = document.getElementById('reset');
  if (resetBtn) {
    resetBtn.onclick = function () {
      if (!confirm('Reset setup? This deletes the config file so onboarding can run again.')) return;
      if (logEl) logEl.textContent = 'Resetting...\n';
      fetch('/setup/api/reset', { method: 'POST', credentials: 'same-origin' })
        .then(function (res) { return res.text(); })
        .then(function (t) { if (logEl) logEl.textContent += t + '\n'; return refreshStatus(); })
        .catch(function (e) { if (logEl) logEl.textContent += 'Error: ' + String(e) + '\n'; });
    };
  }

  refreshStatus();

  // Debug console runner
  function runConsole() {
    if (!consoleCmdEl || !consoleRunEl) return;
    var cmd = consoleCmdEl.value;
    var arg = consoleArgEl ? consoleArgEl.value : '';
    if (consoleOutEl) consoleOutEl.textContent = 'Running ' + cmd + '...\n';

    return httpJson('/setup/api/console/run', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ cmd: cmd, arg: arg })
    }).then(function (j) {
      if (consoleOutEl) consoleOutEl.textContent = (j.output || JSON.stringify(j, null, 2));
      return refreshStatus();
    }).catch(function (e) {
      if (consoleOutEl) consoleOutEl.textContent += '\nError: ' + String(e) + '\n';
    });
  }

  if (consoleRunEl) {
    consoleRunEl.onclick = runConsole;
  }

  // Config raw load/save
  function loadConfigRaw() {
    if (!configTextEl) return;
    if (configOutEl) configOutEl.textContent = '';
    return httpJson('/setup/api/config/raw').then(function (j) {
      if (configPathEl) {
        configPathEl.textContent = 'Config: ' + (j.path || '(unknown)') + (j.exists ? '' : ' (does not exist yet)');
      }
      configTextEl.value = j.content || '';
    }).catch(function (e) {
      if (configOutEl) configOutEl.textContent = 'Error loading config: ' + String(e);
    });
  }

  function saveConfigRaw() {
    if (!configTextEl) return;
    if (!confirm('Save config and restart gateway? A timestamped .bak backup will be created.')) return;
    if (configOutEl) configOutEl.textContent = 'Saving...\n';
    return httpJson('/setup/api/config/raw', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ content: configTextEl.value })
    }).then(function (j) {
      if (configOutEl) configOutEl.textContent = 'Saved: ' + (j.path || '') + '\nGateway restarted.\n';
      return refreshStatus();
    }).catch(function (e) {
      if (configOutEl) configOutEl.textContent += '\nError: ' + String(e) + '\n';
    });
  }

  if (configReloadEl) configReloadEl.onclick = loadConfigRaw;
  if (configSaveEl) configSaveEl.onclick = saveConfigRaw;

})();