# Yield-on-Yield Mini App

A mini app built with MiniKit on Base. Mini apps are lightweight web applications that run directly inside Farcaster Frames, without needing to open a browser or download anything.

## Prerequisites

1. **Farcaster Account**: Create an account on Warpcast to test and deploy Mini Apps
2. **Coinbase Developer Platform Account**: Sign up for CDP if you need API key for additional functionalities

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Testing Your Mini App

### Option 1: Using ngrok (Development)

**Note**: Paid version of ngrok recommended as free version has approval screen that can break frame manifest.

1. Install ngrok:
```bash
npm install -g ngrok
```

2. Create tunnel (after starting your dev server):
```bash
ngrok http 3000
```

3. Use the HTTPS URL provided by ngrok to test in [Warpcast Frames Developer Tools](https://warpcast.com/~/developers/frames)

### Option 2: Deploying to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set required environment variables in Vercel:
- NEXT_PUBLIC_CDP_CLIENT_API_KEY (from CDP Portal)
- NEXT_PUBLIC_URL (deployed app URL)
- NEXT_PUBLIC_IMAGE_URL (optional)
- NEXT_PUBLIC_SPLASH_IMAGE_URL (optional)
- NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR

## Frame Manifest Setup

After deploying to Vercel:

1. Run:
```bash
npx create-onchain --manifest
```

2. Connect your Farcaster custody wallet
3. Add your Vercel URL and sign the manifest
4. Update Vercel environment variables with:
- FARCASTER_HEADER
- FARCASTER_PAYLOAD
- FARCASTER_SIGNATURE

## Key Features Implemented

1. **MiniKitProvider**: Handles initialization, events, and safe area insets
2. **useMiniKit**: Manages frame readiness and SDK context
3. **useAddFrame**: Allows users to add the mini app to their list
4. **useOpenUrl**: Opens external URLs from within the frame
5. **useClose**: Provides frame closing functionality
6. **usePrimaryButton**: Manages global state with persistent bottom button
7. **useViewProfile**: Enables viewing Farcaster profiles
8. **useNotification**: Sends notifications to users through their social app

## Important Notes

- The wallet used for manifest setup must be your Farcaster custody wallet
- For production, store user URLs and tokens in a persistent database for notifications
- Frame manifest is required for saving frames and sending notifications
- Test your mini app using the Warpcast Frames Developer Tools

## Built With

- [Base MiniKit](https://docs.base.org/builderkits/minikit)
- [Next.js](https://nextjs.org/)
- [OnchainKit](https://github.com/coinbase/onchainkit)
