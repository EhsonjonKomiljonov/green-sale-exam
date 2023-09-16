export const notifyUser = (text) => {
  if (!('Notification' in window)) {
    alert("Siz habarnomani o'chirdingiz!");
  } else if (Notification.permission === 'granted') {
    const notify = new Notification(text);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((per) => {
      if (per == 'granted') {
        const notify = new Notification(text);
      }
    });
  }
};
