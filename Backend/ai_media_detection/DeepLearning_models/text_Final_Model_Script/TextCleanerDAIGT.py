import re
import html

class TextCleaner:
    def __init__(self, text, roberta_clean=False):
        """
        Initializes a TextCleaner object with the provided text and optional RoBERTa cleaning flag.

        Args:
            text (str): The text to be cleaned.
            roberta_clean (bool, optional): Flag indicating whether to perform RoBERTa-specific cleaning. Defaults to False.
        """
        self.roberta_clean = roberta_clean
        self.text = text
        self.max_length = 3000

    def remove_hyphenation(self, text):
        """
        Removes hyphenation at the end of lines.

        Args:
            text (str): The input text.

        Returns:
            str: Text with hyphenation removed at the end of lines.
        """
        text = re.sub(r'-\n', '', text)
        return text

    def normalize_whitespace(self, text):
        """
        Replaces multiple spaces with a single space and removes leading/trailing spaces.

        Args:
            text (str): The input text.

        Returns:
            str: Text with normalized whitespace.
        """
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

    def clean_roberta(self, text):
        """
        Cleans text according to RoBERTa model requirements.

        Args:
            text (str): The input text.

        Returns:
            str: Cleaned text suitable for RoBERTa model.
        """
        clean = re.compile('<.*?>')
        text = re.sub(clean, '', text)  # Remove HTML tags
        text = html.unescape(text)  # Replace HTML entities with their corresponding characters
        text = re.sub(r'\s+', ' ', text).strip()  # Remove extra whitespace and normalize spaces
        text = re.sub(r'[^a-zA-Z0-9\s]', '', text)  # Remove non-alphanumeric characters
        return text
    
    def truncate_text(self, text):
        """
        Truncates the text to the maximum length.

        Args:
            text (str): The input text.

        Returns:
            str: Truncated text.
        """
        return text[:self.max_length]
    
    def clean_text(self):
        """
        Orchestrates the text cleaning process by applying all cleaning functions.

        Returns:
            str: Cleaned and processed text.
        """
        self.text = self.remove_hyphenation(self.text)
        if self.roberta_clean:
            self.text = self.clean_roberta(self.text)
        self.text = self.normalize_whitespace(self.text)
        self.text = self.truncate_text(self.text)
        
        return self.text
    
    def __set_maxlength__(self, maxlen):
        """
        Sets the maximum length of text for truncation.

        Args:
            maxlen (int): Maximum length for text truncation.
        """
        self.max_length = maxlen
    
    def __len__(self):
        """
        Returns the length of the cleaned text.

        Returns:
            int: Length of the cleaned text.
        """
        return len(self.clean_text())
    
    def __str__(self):
        """
        Returns the cleaned text as a string representation of the object.

        Returns:
            str: Cleaned text.
        """
        return self.clean_text()
    
    def __getitem__(self, index):
        """
        Enables indexing and slicing of the cleaned text.

        Args:
            index (int or slice): Index or slice object.

        Returns:
            str: Character or substring of the cleaned text.
        """
        cleaned_text = self.clean_text()
        if isinstance(index, slice):
            return cleaned_text[index]
        elif isinstance(index, int):
            return cleaned_text[index]
        else:
            raise TypeError(f"Invalid argument type: {type(index)}")


if __name__ == '__main__': 
    sample_text = '''Mr. and Mrs. Dursley, of number four, Privet Drive, 
    were proud to say that they were perfectly normal, thank you very much.'''
    clean_text = TextCleaner(sample_text, True)
    print(clean_text)
    print(len(clean_text))
