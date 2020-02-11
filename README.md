This app was designed to help medical professionals easily and more accurately screen patients for Parkinson using machine learning, while making it convenient for the patients as well.

A CNN (convoluted neural network) was trained with augmented datasets to detect the presence of Parkinson using the 'tremors' found in spirals drawn by the patient. The patient is prompted to draw on a screen and the image is broken down into an array of pixels which is passed through our API which runs the trained python script. Many challenges were encountered with the ML model, including small datasets, an over-fitted model and trouble integrating the CNN with the API.

Future versions will improve the website, scale up to have industry-level security and privacy policies and improve upon the general UI and UX for the doctors (sorting + highlighting patients that are at risk).
