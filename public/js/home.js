$(document).ready( function() {	
  
  // Fading out loader
    $('#loader').fadeOut();
 
  // Paging settings
  if (window.location.pathname == "/addnews" || window.location.pathname.includes("/editnews")){
    // Paging
    $("#add-news").addClass("active-menu");
    $("#news-list-content").addClass("hide");
    $("#add-news-content").addClass("show");
    $("#news-list-content").addClass("hide");
    $("#add-news-content").removeClass("hide");
    $("#news-list-content").removeClass("show");
    $("#news-list").removeClass("active-menu");
    $(this).addClass("active-menu"); 
    
    if(window.location.pathname == "/addnews" ) {
      // Get new News Id
      $.ajax({
        url:  "/news?limit=1&page=0"
      }).done(function(res, err) {
          if(err) console.log(err);
      });
    }
  }else {
    // Paging
    $("#news-list-content").addClass("show");
    $("#news-list").addClass("active-menu");
    $("#add-news-content").addClass("hide");

    // Table definition and settings
    $('#news-table').bootstrapTable({
      url: '/news',
      queryParams: function (p) {
        return {
          limit: p.limit,
          page: p.offset,
          search: p.search
        };
      },
      pagination: true,
      search: true,
      locale: 'ja-JP',
      pageSize: '20',
      showRefresh: true,
      sortClass: 'td',
      sidePagination: 'server',
      columns: [{
      field: 'status',
      title: '',
      align: 'center',
      formatter: statusFormatter
      }, {
        field: 'id',
        title: 'ID'
      }, {
        field: 'date_from',
        title: 'FROM',
        formatter: dateFormatter
      }, {
        field: 'date_to',
        title: 'TO',
        formatter: dateFormatter
      }, {
        field: 'news_content',
        title: 'NEWS'
      }, {
        field: 'id',
        title: '',
        align: 'center',
        clickToSelect: false,
        formatter: operateFormatter
      }]
    });
        
    // Status column custom render
    function statusFormatter( value, row, index ) {
      if ( value === 0) {
        return '<span class="status-private">Private</span>'
      } else {
        return '<span class="status-public">Public</span>'
      }
    };

    // Date column custom render
    function dateFormatter( value, row, index ) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    };
        
    // Show edit news page
    editNews = id => { 
      $.ajax({
        url:  "/news/"+id
      }).done(function(res, err) {
          if(err) console.log(err);
          window.location.href = "/editnews/"+id
      });
    };

    // Delete news
    deleteNews = id => { 
      if(confirm('Delete news?')){
        $.ajax({
          url:  "/delete/news/"+id
        }).done(function(res, err) {
            if(err) console.log(err)
            window.location.href = "/cms"
        });
      }
    };

    // Action column costum render
    function operateFormatter (value, row, index) {
      return [
        '<a onclick="editNews('+value+')" class="edit" title="Edit News">',
        '<i class="far fa-edit"></i>',
        '</a>  ',
        '<a onclick="deleteNews('+value+')" class="remove" title="Remove">',
        '<i class="fas fa-trash"></i>',
        '</a>'
      ].join('')
    };
  }
      
  // Paging
  $("#news-list").on("click", function() {
    $("#news-list-content").addClass("show");
    $("#add-news-content").addClass("hide");
    $("#news-list-content").removeClass("hide");
    $("#add-news-content").removeClass("show");
    $("#add-news").removeClass("active-menu");
    $(this).addClass("active-menu");   
  });
        
  $("#add-news").on("click", function() {    
    $("#add-news-content").addClass("show");
    $("#news-list-content").addClass("hide");
    $("#add-news-content").removeClass("hide");
    $("#news-list-content").removeClass("show");
    $("#news-list").removeClass("active-menu");
    $(this).addClass("active-menu");   
  }); 
  
  // Validation Add or Edit News Form
  const form = document.getElementById("addNewsForm");
  form.checkValidity();

  ValidityState = {
    badInput: false,
    valid: false,
    valueMissing: true
  };

  let f = function() {
    this.classList.add('touched')
  };

  document
    .querySelectorAll('input, textarea')
    .forEach((e) => {
    e.addEventListener('blur', f, false)
    e.addEventListener('keydown', f, false)
  });

  // checking form for disablity button
  checkForm = () => {
    const isValidForm = form.checkValidity();
    if(isValidForm){
      document.getElementById("addNewsButton").disabled = false;
    } else {
      document.getElementById("addNewsButton").disabled = true;
    }
  };
  
  // Define Date time picker
  $("#date-from").datetimepicker({
    format: "YYYY-MM-DD HH:mm:ss",
    locale : 'jp',
    sideBySide : true,
    ignoreReadonly : true
  });
  $("#date-to").datetimepicker({
    format: "YYYY-MM-DD HH:mm:ss",
    locale : 'jp',
    sideBySide : true,
    ignoreReadonly : true
  });

  // Date To validation
  $('#date-from').on('dp.change', function(e){ 
    if(document.getElementById("dateFrom").value > document.getElementById("dateTo").value){
      alert("Date 'PUBLISH TO' should be greater than date 'PUBLISH FROM'!");
      document.getElementById("addNewsButton").disabled = true;
    }else{
      document.getElementById("addNewsButton").disabled = false;
    }
  });

  $('#date-to').on('dp.change', function(e){ 
    if(document.getElementById("dateFrom").value > document.getElementById("dateTo").value){
      alert("Date 'PUBLISH TO' should be greater than date 'PUBLISH FROM'!");
      document.getElementById("addNewsButton").disabled = true;
    }else{
      document.getElementById("addNewsButton").disabled = false;
    }
  });
 });