const express=require('express')
const router=express.Router();
const Contact=require('../models/contact')
const app=express()




router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        console.log(data)
        if (!data.firstName || !data.lastName || !data.email || !data.phoneNumber) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const contact=new Contact(data);
        const savedContact=await contact.save();
        return res.status(201).json(contact); // Ensure return is used to stop further code execution

        console.log("datasaved");
    }
    catch(err){
        res.status(500).json(err);
    }

})

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(updatedContact);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE /contacts/:id: Delete a specific contact
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // console.log({id});
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;