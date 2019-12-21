const fs = require('fs');
const Datastore = require('nedb');
const images = new Datastore({ filename: 'images.db' });

const cameraPictureDir = '/sdcard/DCIM/100RICOH/'


images.loadDatabase();


function loadAll() {
    fs.readdir(cameraPictureDir, (fileErr, items)=> {
	if (!fileErr) {
	    console.log("About to insert these items \n" + items);
	    items.forEach(item => {
		const image = {
		    title: 'Beautiful title for ' + item,
		    filename: item
		}
		images.insert(image, (err, doc)=> {
		    if (!err) {
			console.log('Inserted', doc.filename, 'with ID', doc._id);
		    } else {
			console.log(err);
		    }
		});
	    })

	} else {
	    console.log(fileErr);
	}
    });
}


function findAll() {
    images.find({}, (err, doc)=> {
	if (!err) {
	    console.log(doc);
	} else {
	    console.log(err);
	}
    });
}

// loadAll();
// images.remove({_id: 'lZaB4KIijYsmIKde'});
findAll();
