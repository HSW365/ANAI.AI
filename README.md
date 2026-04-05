# ANAI.AI — App Store Submission Files
Domain: anaiai.co | Bundle ID: co.anaiai.app

## Where each file goes in your project

| File | Destination in your repo |
|------|--------------------------|
| capacitor.config.json | project root |
| codemagic.yaml | project root |
| components/LiveView.tsx | src/components/LiveView.tsx |
| ios/App/Info.plist | ios/App/Info.plist |
| ios/App/AppDelegate.swift | ios/App/App/AppDelegate.swift |
| ios/App/Podfile | ios/App/Podfile |
| ios/App/PrivacyInfo.xcprivacy | ios/App/App/PrivacyInfo.xcprivacy |

## Before pushing to Codemagic

1. Set these env vars in Codemagic dashboard:
   - APP_STORE_CONNECT_PRIVATE_KEY  (.p8 file contents)
   - APP_STORE_CONNECT_KEY_IDENTIFIER  (Key ID)
   - APP_STORE_CONNECT_ISSUER_ID  (Issuer ID)
   - APP_STORE_APPLE_ID  (numeric app ID)
   - VITE_GEMINI_API_KEY  (Gemini API key)

2. In Apple Developer account:
   - Register bundle ID: co.anaiai.app
   - Create App Store Distribution certificate
   - Create App Store provisioning profile
   - Create App Store Connect API key

3. In Xcode:
   - PRODUCT_BUNDLE_IDENTIFIER = co.anaiai.app
   - MARKETING_VERSION = 1.0.0
   - CURRENT_PROJECT_VERSION = 1
   - Add Associated Domains: applinks:anaiai.co

4. Host at anaiai.co before submitting:
   - /.well-known/apple-app-site-association
   - /privacy
   - /terms
   - /support

5. Run locally:
   npm install && npm run build
   cd ios/App && pod install --repo-update
   npx cap sync ios

## In-App Subscription IDs for App Store Connect
   co.anaiai.app.basic   — web apps & AI websites
   co.anaiai.app.pro     — Apple & Google Store apps
   co.anaiai.app.elite   — custom AI models & workflows
