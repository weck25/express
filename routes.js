const express = require('express');
const router = express.Router();
const db = require('./config/database');
const { json } = require('body-parser');

// Create
router.post('/articles', (req, res) => {
 const data = {...req.body};
  const sql = 'INSERT INTO article SET ?';
  db.query(sql,data, (err, rows, field)=>{
    console.log(data)
    if(err){
      return res.status(500).json({message:'gagal input data', error:err});
    }
    res.status(201).json({ success: true, message: 'Berhasil insert data!', result: data });
    
  })
});

// Read
router.get('/articles', (req, res) => {
  const sql = 'SELECT * FROM article';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update
router.put('/update/:id', (req, res) => {
  const data = {...req.body};
 
  const querySearch = 'SELECT * FROM article WHERE id = ?';
  const queryUpdate = 'UPDATE article SET ? WHERE id = ?';

  db.query(querySearch, req.params.id, (err, rows, field) =>{
    if (err){
      return res.status(500),json({message:"id yang di masukan salah atau tidak ada"})
    };
    if(rows.length){
      db.query(queryUpdate,[data, req.params.id], (err,rows,field)=>{
        if(err){
          return res.status(400).json({message:'Gagal update data'})
        }
        res.status(200).json({message:'berhasil update', result:data})
      })
    }
  }  )
});

// Delete
router.delete('/delete/:id', (req, res) => {
  const querySearch = 'SELECT * FROM article WHERE id = ?';
    const queryDelete = 'DELETE FROM article WHERE id = ?';
    db.query(querySearch, req.params.id, (err,rows,field)=>{
      if(err){
        return res.status(500).json({message:'gagal temukan id'})
      }
      if(rows.length){
      
        db.query(queryDelete, req.params.id,(err, rows, field)=>{
          if(err){
            return res.status(500).json({message:'gagal delet'})
          }
          res.status(200).json({ success: true, message: 'Berhasil hapus data!' });
        })
      }
      else {
        res.status(404).json({message:'data tidak ditemukan', success:false})
      }
    })
});

module.exports = router;
