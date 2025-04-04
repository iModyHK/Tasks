
import axios from 'axios';

function sendEmailNotification(to, subject, text) {
  axios.post('/api/mail/send', { to, subject, text }, {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  }).then(res => {
    alert('Email sent successfully!');
  }).catch(err => {
    alert('Error sending email: ' + err.message);
  });
}

export default sendEmailNotification;
