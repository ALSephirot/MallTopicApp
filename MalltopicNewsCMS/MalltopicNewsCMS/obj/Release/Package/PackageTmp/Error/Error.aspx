<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Error.aspx.cs" Inherits="malltopicCMS.Error.Error" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link rel="shortcut icon" href="~/favicon1.ico" />
    <title>Error de acceso</title>
</head>

<body>

  
    <div class="bolsaError"></div>
    <form id="form1" runat="server" class="content">
    <h1>¡OOPS!</h1>
    <div>
        <div id="TituloError" class="descr">
        <div id="Error">
        <asp:Label ID="lblDetError" runat="server" TextMode="MultiLine"></asp:Label>
            </div>
        </div>
            <div id="volver"  class="volver">
                <asp:LinkButton name="btnVolver" ID="btnVolver" runat="server" class="botonAzul" OnClick="btnVolver_Click" >Volver</asp:LinkButton>
            </div>
    </div>
    </form>




</body>
</html>



   


               

     
