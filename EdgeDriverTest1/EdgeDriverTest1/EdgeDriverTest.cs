using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Interactions;

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
        public void AddNote()
        {
            // Replace with your own test logic.
            browser.Url = "http://127.0.0.1:5500/index.html";
            string loremIpsum = "Lorem Ipsum";
            var newItemInput = browser.FindElementByCssSelector("#new-item");
            newItemInput.SendKeys(loremIpsum);
            newItemInput.SendKeys(Keys.Enter);
            var note = browser.FindElementByCssSelector("#notes #note-text");

            Assert.AreEqual(loremIpsum, note.GetAttribute("value"));
        }
        [TestMethod]
        public void ZeroItemsLeft()
        {
            // Replace with your own test logic.
            browser.Url = "http://127.0.0.1:5500/index.html";
            string loremIpsum = "Lorem Ipsum";
            var newItemInput = browser.FindElementByCssSelector("#new-item");
            newItemInput.SendKeys(loremIpsum);
            newItemInput.SendKeys(Keys.Enter);
            var itemsLeftCounter = browser.FindElementByCssSelector("#dashboard #items-left-counter");

            Assert.AreEqual("1 item left", itemsLeftCounter.Text);

            var checkBox = browser.FindElementByCssSelector("#mark-complete");
            checkBox.Click();

            Assert.AreEqual("0 items left", itemsLeftCounter.Text);

        }

        [TestMethod]
        public void TwoItemsLeft()
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
            var itemsLeftCounter = browser.FindElementByCssSelector("#dashboard #items-left-counter");

            var checkBox = browser.FindElementByCssSelector("#mark-complete");
            checkBox.Click();

            Assert.AreEqual("2 items left", itemsLeftCounter.Text);

        }
        [TestMethod]
        public void EditNote()
        {
            browser.Url = "http://127.0.0.1:5500/index.html";
            string firstText = "Lorem Ipsum";
            string secondText = "Ipsum Lorem";
            var newItemInput = browser.FindElementByCssSelector("#new-item");
            newItemInput.SendKeys(firstText);
            newItemInput.SendKeys(Keys.Enter);
            var note = browser.FindElementByCssSelector("#notes #note-text");
            Actions action = new Actions(browser);


            action.DoubleClick(note).Build().Perform();
            note.SendKeys(Keys.LeftControl + "a");
            note.SendKeys(Keys.Backspace);
            note.SendKeys(secondText);
            note.SendKeys(Keys.Enter);

            Assert.AreEqual(secondText, note.GetAttribute("value"));
        }

        [TestMethod]
        public void UrlChangeByFilterChange()
        {
            browser.Url = "http://127.0.0.1:5500/index.html";
            string loremIpsum = "Lorem Ipsum";
            var newItemInput = browser.FindElementByCssSelector("#new-item");
            newItemInput.SendKeys(loremIpsum);
            newItemInput.SendKeys(Keys.Enter);
            var activeFilterButton = browser.FindElementByCssSelector("#active + label");
            activeFilterButton.Click();

            Assert.AreEqual(browser.Url, "http://127.0.0.1:5500/index.html#active");
        }

        [TestMethod]
        public void UrlChangeByPreviousPage()
        {
            browser.Url = "http://127.0.0.1:5500/index.html";
            string loremIpsum = "Lorem Ipsum";
            var newItemInput = browser.FindElementByCssSelector("#new-item");
            newItemInput.SendKeys(loremIpsum);
            newItemInput.SendKeys(Keys.Enter);
            var activeFilterButton = browser.FindElementByCssSelector("#active + label");
            activeFilterButton.Click();

            var completedFilterButton = browser.FindElementByCssSelector("#completed + label");
            completedFilterButton.Click();

            browser.Navigate().Back();

            Assert.AreEqual(browser.Url, "http://127.0.0.1:5500/index.html#active");
        }


        [TestCleanup]
        public void EdgeDriverCleanup()
        {
            browser.Quit();
        }
    }
}
