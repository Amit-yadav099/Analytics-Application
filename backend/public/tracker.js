// static file to auto tracks page_view on load and click events

(function() {
  // Get or create session ID
  const SESSION_KEY = 'analytics_session_id';
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(SESSION_KEY, sessionId);
  }

 const API_URL =window.location.origin +'/api/events';
 
function sendEvent(eventType, extra = {}) {
  const data = {
    sessionId,
    eventType,
    pageUrl: window.location.href,
    timestamp: new Date().toISOString(),
    ...extra
  };
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(console.log)          // optional: see server response
  .catch(console.error);
}

  // Track page view
  sendEvent('page_view');

  // Track clicks
  document.addEventListener('click', (e) => {
    sendEvent('click', {
      x: e.clientX,
      y: e.clientY
    });
  });
})();