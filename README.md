# Features
1. Like specified in the email, the user can visit the website and upload two PDFS, a brochure and a floor plan, for a specific property. The data, specifcally the fields stated in the email, are then extracted via an LLM - Gemini 2.0, in this case. After the data is received, it is then shown to user in a form.
2. Some additional features that I added were:
  - The user, if needed, can edit the data displayed if they are to find any mistakes (for example, missing the price when it is stated in the documents). Then, they can save this data. Though saving is done simply to disk, this, in actuality, would be data sent a database. This feature was actually added because this direclty allows us to train custom parsing agents, so we won't have to rely on Gemini, for example. This is because, when a user submits a change, I save the originally uploaded PDFs, the original AI produced data, and finally the changes made by the user. This would allow us to create high quality training data to develop the custom parsing agent.
  - The benefit of having data corresponding to specific properties is that if other users also aim to extract information about that property, then the API, instead of using LLM, shows the most up-to-date information. This, again, would be done using a database, but this shows the concept. This would direclty optimize costs as longer PDFs could be very expensive to parse repeatedly.
  - Additionally, in regards to cost-saving, I also added a debounce which prevents users from simply 'spamming' the parse button (which leads to the LLM call). As, otherwise, repeated calls for the same PDFs could also be costly.
  - There are some quality-of-life features such as the clear button which allows the user to reset the app in its entirety, allowing them to parse many PDFs, if needed. And, of course there is drop down zone, which makes uploading files quick.

## Running the app (recommended way to setup)

If you don't want to setup using Docker, the frontend and backend of the app can be hosted manually. Instructions are included in their READMEs.

1. Make sure to download the .env file from the email and put into the backend directory.
2. If you don't have docker desktop installed, install it using: ```bash brew install --cask docker```
3. Run the daemon.
4. To run the services: ```bash docker compose up --build```
5. Once the setup is complete, access the website via: [Here](http://localhost:3000/upload)
