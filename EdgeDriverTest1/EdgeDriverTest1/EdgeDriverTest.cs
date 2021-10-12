using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Edge;

namespace EdgeDriverTest1
{
    [TestClass]
    public class EdgeDriverTest
    {
        private const string edgeDriverDirectory = @"C:\WebDriver";
        private EdgeDriver browser;

        [TestInitialize]
        public void EdgeDriverInitialize()
        {
            browser = new EdgeDriver(edgeDriverDirectory);
        }

        [TestMethod]
        public void ExampleTest()
        {
            // Replace with your own test logic.
            browser.Url = "http://127.0.0.1:5500/index.html";
            string loremIpsum = "Lorem Ipsum";
            var newItemInput = browser.FindElementByCssSelector("#new-item");
            newItemInput.SendKeys(loremIpsum);
            newItemInput.SendKeys(Keys.Enter);
            var noteList = browser.FindElementByCssSelector("#notes");
            var note = browser.FindElementByCssSelector("#notes #note-text");

            Assert.AreEqual(loremIpsum, note.Text);
        }
        [TestMethod]
        public void ExampleTest1()
        {
            // Replace with your own test logic.
            browser.Url = "http://127.0.0.1:5500/index.html";
            string loremIpsum = "Lorem Ipsum";
            var newItemInput = browser.FindElementByCssSelector("#new-item");
            newItemInput.SendKeys(loremIpsum);
            newItemInput.SendKeys(Keys.Enter);
            var dashboard = browser.FindElementByCssSelector("#dashboard");
            var itemsLeftCounter = browser.FindElementByCssSelector("#dashboard #items-left-counter");

            Assert.AreEqual("1 item left", itemsLeftCounter.Text);

            var checkBox = browser.FindElementByCssSelector("#mark-complete");
            checkBox.Click();

            Assert.AreEqual("0 items left", itemsLeftCounter.Text);

        }

        [TestMethod]
        public void ExampleTest2()
        {
            // Replace with your own test logic.
            browser.Url = "http://127.0.0.1:5500/index.html";
            string loremIpsum = "Lorem Ipsum";
            var newItemInput = browser.FindElementByCssSelector("#new-item");
            newItemInput.SendKeys(loremIpsum);
            newItemInput.SendKeys(Keys.Enter);
            newItemInput.SendKeys(loremIpsum);
            newItemInput.SendKeys(Keys.Enter);
            newItemInput.SendKeys(loremIpsum);
            newItemInput.SendKeys(Keys.Enter);
            var dashboard = browser.FindElementByCssSelector("#dashboard");
            var itemsLeftCounter = browser.FindElementByCssSelector("#dashboard #items-left-counter");

            var checkBox = browser.FindElementByCssSelector("#mark-complete");
            checkBox.Click();

            Assert.AreEqual("2 items left", itemsLeftCounter.Text);

        }

        //[TestMethod]
        //public void BMITest() 
        //{
        //    browser.Url = "dashboardurl";
        //    var weightInput = browser.FindElementByCssSelector("[name='weight']");
        //    weightInput.SendKeys("70");
        //    var heightInput = browser.FindElementByCssSelector("[name='height']");
        //    heightInput.SendKeys("1.8");
        //    heightInput.SendKeys(Keys.Enter);
        //    var bmiOutput = browser.FindElementByCssSelector("[name='bmi']");
        //    Assert.AreEqual("21.6", bmiOutput.Text);
        //}

        //[TestMethod]
        //public void BMIHistoryTest()
        //{
        //    browser.Url = "dashboardurl";
        //    var weightInput = browser.FindElementByCssSelector("[name='weight']");
        //    weightInput.SendKeys("70");
        //    var heightInput = browser.FindElementByCssSelector("[name='height']");
        //    heightInput.SendKeys("1.8");
        //    var button = browser.FindElementByCssSelector("button");
        //    button.Click();
        //    var listItem = browser.FindElementByCssSelector("#results li");
        //    Assert.IsTrue(listItem.Text.StartsWith("21.6"));

        //    weightInput.Clear();
        //    weightInput.SendKeys("75");
        //    button.Click();

        //    var listItems = browser.FindElementByCssSelector("#results li");
        //    Assert.IsTrue(listItems[0].Text.StartsWith("21.6"));
        //    Assert.IsTrue(listItems[1].Text.StartsWith("23.1"));
        //    Assert.AreEqual(2, listItems.Count);
        //}

        [TestCleanup]
        public void EdgeDriverCleanup()
        {
            browser.Quit();
        }
    }
}
