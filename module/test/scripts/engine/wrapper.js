jasmine.Spec.prototype.runs = function(func) {
	var block = new jasmine.Block(this.env, func, this), spec = request
			.getParameter("spec");
	if (spec == null) {
		this.addToQueue(block);
	} else if (this.env.currentSpec.suite.description == spec) {
		this.addToQueue(block);
	}
	return this;
};


jasmine.Queue.prototype.next_ = function() {
	var self = this;
	var goAgain = true;

	while (goAgain) {
		goAgain = false;

		if (self.index < self.blocks.length
				&& !(this.abort && !this.ensured[self.index])) {
			var calledSynchronously = true;
			var completedSynchronously = false;

			var onComplete = function() {
				if (jasmine.Queue.LOOP_DONT_RECURSE && calledSynchronously) {
					completedSynchronously = true;
					return;
				}

				if (self.blocks[self.index].abort) {
					self.abort = true;
				}

				self.offset = 0;
				self.index++;

				var now = new Date().getTime();

				if (self.env.lastUpdate == 0) {

					self.env.lastUpdate = now;
				}

				if (self.env.updateInterval
						&& now - self.env.lastUpdate > self.env.updateInterval) {
					self.env.lastUpdate = now;
					self.next_();
				} else {
					if (jasmine.Queue.LOOP_DONT_RECURSE
							&& completedSynchronously) {

						goAgain = true;
					} else {
						self.next_();
					}
				}
			};
			self.blocks[self.index].execute(onComplete);

			calledSynchronously = false;
			if (completedSynchronously) {
				onComplete();
			}

		} else {
			self.running = false;
			if (self.onComplete) {
				self.onComplete();
			}
		}
	}
};