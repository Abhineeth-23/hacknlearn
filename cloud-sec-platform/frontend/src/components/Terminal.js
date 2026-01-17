import React from 'react';

function Terminal({ attackIP }) {
  if (!attackIP) return null;

  // For simplicity, using an iframe to a web-based terminal
  // In a real implementation, you'd use xterm.js or similar
  const terminalUrl = `http://${attackIP}:7681`; // Assuming ttyd is running on port 7681

  return (
    <div className="terminal">
      <h4>Attack Terminal</h4>
      <iframe
        src={terminalUrl}
        width="100%"
        height="400px"
        title="Attack Terminal"
      />
    </div>
  );
}

export default Terminal;