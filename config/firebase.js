/**
 * @module app.firebase
 * @description Firebase Confguration file
 *
 * @requires firebase-admin
 * @requires module:app.winston
 *
 * @version 0.1.0
 * @since 0.1.0
 */

const admin = require('firebase-admin');
const firebaseServiceAccount = require('./firebase-service-account.json');
const winston = require('./winston');

try {
  /** Inititalize Firebase Admin SDK with required configuration */
  admin.initializeApp({
    credential: admin.credential.cert(firebaseServiceAccount),
    storageBucket: process.env.GCP_STORAGE_BUCKET,
  });
  winston.info('Reclamation Server | Firebase | Admin Application Initialized');
} catch (e) {
  winston.error(new Error('Reclamation Server | Firebase | Could not initialize admin application'), e);
  return;
}

module.exports = {
  /**
   * @description Firebase Authentication Library
   * @constant
   *
   * @type {admin.auth.Auth}
   */
  auth: admin.auth(),

  /**
   * @description Firebase Storage Library
   * @constant
   *
   * @type {admin.storage.Storage}
   */
  bucket: admin.storage().bucket(),
};
