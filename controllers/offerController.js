import Offer from '../models/offerModel.js';

// Get All Offers
const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find().sort({ createdAt: -1 });
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add New Offer
const addOffer = async (req, res) => {
    try {
        const { title, description, buttonText } = req.body;

        if (!title || !description || !buttonText) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newOffer = Offer.create(
            {
                title,
                description,
                buttonText
            }
        );
        await newOffer.save;

        res.status(201).json(newOffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Offer
const updateOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, buttonText } = req.body;

        const updatedOffer = await Offer.findByIdAndUpdate(id,
            {
                title,
                description,
                buttonText
            },
            { new: true }
        );

        if (!updatedOffer) {
            return res.status(404).json({ message: "Offer not found." });
        }

        res.status(200).json(updatedOffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Offer
const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOffer = await Offer.findByIdAndDelete(id);

        if (!deletedOffer) {
            return res.status(404).json({ message: "Offer not found." });
        }

        res.status(200).json({ message: "Offer deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllOffers, addOffer, updateOffer, deleteOffer };