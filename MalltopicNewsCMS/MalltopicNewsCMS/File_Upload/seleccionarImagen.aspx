<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="seleccionarImagen.aspx.cs" Inherits="MalltopicNewsCMS.File_Upload.seleccionarImagen" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <title></title>
        <style>
          #Image1 {
            display:inline-block;   
            width:267px !important;
            height:267px !important;
            border:1px solid #2593DC !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <asp:Label ID="Label1" runat="server" Text="Seleccione una imagen. "></asp:Label><br/><br/>
        <asp:FileUpload ID="FileUpload1" runat="server" OnLoad="Page_Load"/>
    </div>
        <div>
            <asp:Image ID="Image1" runat="server" />    
            <br />
            <asp:Button ID="Button1" runat="server" Text="Siguiente" OnClick="Button1_Click" />
        </div>
    </form>
</body>
     <script >
$(window).load(function(){

 $(function() {
     $('#FileUpload1').change(function (e) {
      agregarImage(e); 
     });

     function agregarImage(e){
      var file = e.target.files[0],
      imageType = /image.*/;
    
      if (!file.type.match(imageType))
       return;
  
      var reader = new FileReader();
      reader.onload = fileOnload;
      reader.readAsDataURL(file);
     }
  
     function fileOnload(e) {
      var result=e.target.result;
      $('#Image1').attr("src", result);
     }

     function archivo(){
      window.location = toDataURL("image/png")
     }
    });
  });
</script>
</html>
