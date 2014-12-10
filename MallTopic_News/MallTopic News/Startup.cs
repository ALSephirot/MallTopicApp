using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MallTopic_News.Startup))]
namespace MallTopic_News
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
