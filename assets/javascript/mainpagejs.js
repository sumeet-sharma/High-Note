$(document).ready(function(){

    $("#mainpagesearchbutton").on("click",function(){
        event.preventDefault();
        document.location.href='./searchresults.html';
        localStorage.clear();
        var keyword=$("#main-page-search").val();
        console.log(keyword);
        localStorage.setItem('keyword', keyword);
    })

    $(document).on("click",".dropdown-genre",function(){
        event.preventDefault();
        document.location.href='./searchresults.html';
        localStorage.clear();
        var keyword=$(this).attr("data-value");
        console.log(keyword);
        localStorage.setItem('keyword', keyword);
    })

})