const mongoose = require('mongoose')

const properties = {
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  text: { type: String, required: true, maxlength: 1000 },
  date: { type: Date, default: new Date(), required: true },
  read: { type: Boolean, default: false }
}

const schema = new mongoose.Schema(properties)

schema.methods = {

  /**
   * Convert object of this class to simple response object.
   *
   * @return {object}
   */
  toResponse: function (extended) {
    let obj = {}

    obj.id = this._id;
    
    if(this.sender._id) {
      obj.sender = this.sender._id;
      obj.senderName = this.sender.getFullName();
    } else {
      obj.sender = this.sender;
    }

    if(this.recipient._id) {
      obj.recipient = this.recipient._id;
      obj.recipientName = this.recipient.getFullName();
    } else {
      obj.recipient = this.recipient;
    }
    
    obj.text = this.text;
    obj.date = this.date;
    obj.read = this.read;

    return obj
  }
}

module.exports = mongoose.model('Message', schema)
