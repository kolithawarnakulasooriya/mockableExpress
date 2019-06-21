function deleteDomain(index) {
  var result = confirm("Do You Want to delete?");
  if (result) {
    window.location.href = `/domain/delete/${index}`;
  }
}

function generateUUID() {
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); 
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function createAuthKey() {
  var id = generateUUID();
  document.getElementById("authkey").innerHTML = ` Authorization: Bearer ${id} `;
  $.ajax({
    type: 'POST',
    url: '/saveToken',
    data: {
      id:id
    }
  });
}

$(function() {
  $('#chk-enable-upload').bootstrapToggle({
    on: 'Enabled',
    off: 'Disabled'
  });
})

$(function() {
  $('#chk-enable-upload').change(function() {
    $.ajax({
      type: 'POST',
      url: '/saveEnableUpload',
      data: {
        status:$(this).prop('checked')
      }
    });
  })
})

function getEnableUpload() {
  $.ajax({
    type: 'GET',
    url: '/getEnableUpload'
  }).done(function (data) {
    if(data.enable == 'true')
      $('#chk-enable-upload').bootstrapToggle('on')
    else
      $('#chk-enable-upload').bootstrapToggle('off')
  });
}

