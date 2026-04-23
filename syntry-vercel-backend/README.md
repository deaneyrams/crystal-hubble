# Syntry AI Vercel Backend

High-velocity serverless backend for the Syntry.co real estate exchange, powered by Google Gemini 1.5 Flash.

## Deployment Instructions

1.  **Install Vercel CLI**:
    ```bash
    npm i -g vercel
    ```

2.  **Deploy to Vercel**:
    Run the following command in the root of this project:
    ```bash
    vercel --prod
    ```

3.  **Obtain Endpoint**:
    Once deployed, your backend will be live at:
    `https://YOUR-PROJECT-NAME.vercel.app/api/syntry-ai`

## Integration

To connect the frontend chat widget, point your `fetch` calls to the URL generated in step 3.

## Maintenance

- The Gemini API key is hardcoded in `api/syntry-ai.js` as requested. For better security, consider moving this to Vercel Environment Variables.
- To switch to Gemini 1.5 Pro, change the model name in `api/syntry-ai.js`.
