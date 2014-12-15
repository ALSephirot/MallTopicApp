<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FileUpload.aspx.cs" Inherits="MalltopicNewsCMS.File_Upload.FileUpload" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script src="../Scripts/MostrarImg.js"></script>
    <script src="../Scripts/jquery-2.1.1.min.js"></script>
    <title></title>
</head>
    <style>
        #TextBox1 {
            display:none;
        }
    </style>
<body>
    <form id="form1" runat="server">
    <div>
    <asp:Label ID="Label1" runat="server" Text="Subir imagen. "></asp:Label>
        <br/><br/>
        <input type="submit" class="modal" id="botonSub" value="Cargar imagen" /><br />

        <br/><br/>
        <%--<asp:Label ID="Label2" runat="server" Text="Nombre de la imagen."></asp:Label><br/>--%>
        <asp:TextBox ID="TextBox1" runat="server" ></asp:TextBox>
        <br/><br/>
        <asp:Button ID="Button2" runat="server" Text="Subir" OnClick="Button2_Click" />
    </div>
    </form>
</body>
     <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script>
    $(document).ready(function () {
        $(".modal").click(function () {
            var pop = window.open('../File_Upload/seleccionarImagen.aspx', '/File_Upload/seleccionarImagen.aspx', 'width=450,height=500');
            
        });
    })
</script>
</html>
