package storygen;

import massive.munit.Assert;
import dropecho.storygen.*;

class TransformsTest {
	@Test
	public function capitalize() {
		var s = "hi";
		var expected = "Hi";

		var out = Transforms.capitalize(s);
		Assert.areEqual(expected, out);
	}

	@Test
	public function a_const() {
		var s = "bird";
		var expected = "a bird";

		var out = Transforms.a(s);
		Assert.areEqual(expected, out);
	}

	@Test
	public function a_const_by_name() {
		var s = "bird";
		var expected = "a bird";

		var out = Transforms.get("a")(s);
		Assert.areEqual(expected, out);
	}

	@Test
	public function a_vowel() {
		var s = "owl";
		var expected = "an owl";

		var out = Transforms.a(s);
		Assert.areEqual(expected, out);
	}

	@Test
	public function pluralize() {
		Assert.areEqual("owls", Transforms.pluralize("owl"));
		Assert.areEqual("birds", Transforms.pluralize("bird"));
		Assert.areEqual("batches", Transforms.pluralize("batch"));
		Assert.areEqual("glories", Transforms.pluralize("glory"));
	}
}
