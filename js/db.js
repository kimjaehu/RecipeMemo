// data persistence
db.enablePersistence().catch(err => {
  if (err.code == 'failed-precondition') {
    // probably multiple tabs open at once
    console.log('failed: persistence');
  } else if (err.code == 'unimplemented') {
    // no browser support
    console.log('persistence unavailable');
  }
});

//real time listener
db.collection('recipes').onSnapshot(snapshot => {
  console.log(snapshot.docChanges());
  snapshot.docChanges().forEach(change => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === 'added') {
      // add data to web page
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === 'removed') {
      //remove data from web page
    }
  });
});
